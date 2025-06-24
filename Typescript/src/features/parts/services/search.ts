import {
    ComponentListType,
    PcPartCategory,
    PcPartType,
    RegionCode,
    SearchOptionsType,
} from '@roelcrabbe/optirig-types';
import puppeteer from 'puppeteer';

const PcPartTrackerDefaultUrl = 'pcpartpicker.com';

const getBaseUrl = (region: RegionCode = RegionCode.US) => {
    return region === RegionCode.US
        ? `https://${PcPartTrackerDefaultUrl}`
        : `https://${region}.${PcPartTrackerDefaultUrl}`;
};

const getListUrl = (region: RegionCode = RegionCode.US, listId: string) => {
    return `${getBaseUrl(region)}/list/${listId}`;
};

const initBrowser = async (url: string) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    return { browser, page };
};

export const getComponentList = async ({
    searchOptionsInput,
}: {
    searchOptionsInput: SearchOptionsType;
}): Promise<ComponentListType> => {
    const { region = RegionCode.US, listId } = searchOptionsInput;
    let browser;

    try {
        const { browser: br, page } = await initBrowser(getListUrl(region, listId));
        browser = br;

        await page.waitForSelector('div.partlist.partlist--view table tbody tr.tr__product', {
            timeout: 7500,
        });

        await page.waitForNetworkIdle({ idleTime: 500, timeout: 5000 });
        await new Promise((res) => setTimeout(res, 500));

        const result = await page.evaluate(() => {
            function extractPriceInfo(priceAnchor: Element | null, row: Element) {
                const priceElement = priceAnchor || row.querySelector('td.td__price a');
                if (!priceElement) return null;

                const priceText = priceElement.textContent?.trim() || '';
                const priceMatch = priceText.match(/([€$])\s?([0-9,.]+)/);
                if (!priceMatch) return null;

                const currencySymbol = priceMatch[1];
                const currency =
                    currencySymbol === '€' ? 'EUR' : currencySymbol === '$' ? 'USD' : null;
                if (!currency) throw new Error(`Unsupported currency symbol: "${currencySymbol}"`);

                const rawPrice = priceMatch[2].replace(',', '.').replace(/[^0-9.]/g, '');
                const price = parseFloat(rawPrice);
                if (isNaN(price)) throw new Error(`Parsed price is NaN: "${rawPrice}"`);

                const buyLink = priceElement.getAttribute('href');
                if (!buyLink)
                    throw new Error('Buy link (href) is missing despite price being present');

                return { price, currency, buyLink };
            }

            function extractImageUrl(row: Element): string {
                const imgElement = row.querySelector('td.td__image img');
                const rawImageUrl = imgElement?.getAttribute('src') || '';
                return rawImageUrl.startsWith('//') ? `https:${rawImageUrl}` : rawImageUrl;
            }

            function extractWattage(): number {
                const wattageElement = document.querySelector('.partlist__keyMetric');
                if (!wattageElement) throw new Error('Wattage element not found');

                const wattageText = wattageElement.textContent?.trim() || '';
                const wattageMatch = wattageText.match(/(\d+)W/);

                if (!wattageMatch) throw new Error('Wattage value not found');

                return parseInt(wattageMatch[1], 10);
            }

            function extractTotalPrice(): {
                totalPrice: number;
                totalCurrency: string;
            } {
                const totalRows = document.querySelectorAll('tr.tr__total');
                const finalTotalRow = document.querySelector('tr.tr__total--final');

                if (!finalTotalRow) {
                    const lastTotalRow = totalRows[totalRows.length - 1];
                    if (!lastTotalRow) throw new Error('No total price rows found');

                    const priceElement = lastTotalRow.querySelector('td.td__price');
                    if (!priceElement) throw new Error('Total price element not found');

                    const priceText = priceElement.textContent?.trim() || '';
                    const priceMatch = priceText.match(/([€$])\s?([0-9,.]+)/);

                    if (!priceMatch) throw new Error('Total price format not recognized');

                    const currencySymbol = priceMatch[1];
                    const currency =
                        currencySymbol === '€' ? 'EUR' : currencySymbol === '$' ? 'USD' : null;
                    if (!currency) throw new Error(`Unsupported currency: ${currencySymbol}`);

                    const rawPrice = priceMatch[2].replace(/,/g, '').replace(/[^0-9.]/g, '');
                    const price = parseFloat(rawPrice);

                    if (isNaN(price)) throw new Error('Invalid price value');

                    return {
                        totalPrice: price,
                        totalCurrency: currency,
                    };
                }

                const priceElement = finalTotalRow.querySelector('td.td__price');
                if (!priceElement) throw new Error('Final total price element not found');

                const priceText = priceElement.textContent?.trim() || '';
                const priceMatch = priceText.match(/([€$])\s?([0-9,.]+)/);

                if (!priceMatch) throw new Error('Final total price format not recognized');

                const currencySymbol = priceMatch[1];
                const currency =
                    currencySymbol === '€' ? 'EUR' : currencySymbol === '$' ? 'USD' : null;
                if (!currency) throw new Error(`Unsupported currency: ${currencySymbol}`);

                const rawPrice = priceMatch[2].replace(/,/g, '').replace(/[^0-9.]/g, '');
                const price = parseFloat(rawPrice);

                if (isNaN(price)) throw new Error('Invalid final price value');

                return {
                    totalPrice: price,
                    totalCurrency: currency,
                };
            }

            const rows = document.querySelectorAll(
                'div.partlist.partlist--view table tbody tr.tr__product',
            );

            const components: PcPartType[] = [];

            rows.forEach((row, index) => {
                try {
                    const component = row.querySelector('td.td__component a')?.textContent?.trim();
                    if (!component) throw new Error('Component Not Found');

                    const nameElement = row.querySelector('td.td__name a');
                    if (!nameElement) throw new Error('Main Name Element Not Found');

                    const name = nameElement.textContent?.trim();
                    const productUrl = nameElement.getAttribute('href');
                    if (!name || !productUrl) throw new Error('Name or URL Not Found');

                    const priceAnchor = row.querySelector('td.td__price a');
                    if (!priceAnchor) throw new Error('Main Price Anchor Not Found');

                    const priceInfo = extractPriceInfo(priceAnchor, row);
                    const imageUrl = extractImageUrl(row);

                    components.push({
                        id: index + 1,
                        category: component as PcPartCategory,
                        name,
                        imageUrl,
                        pcpartpicker: {
                            price: priceInfo?.price || 0,
                            currency: priceInfo?.currency || 'USD',
                            url: productUrl.startsWith('/')
                                ? `https://de.pcpartpicker.com${productUrl}`
                                : productUrl,
                            buyLink: priceInfo?.buyLink || '',
                        },
                    });
                } catch (err) {
                    console.warn(`Error on row ${index}:`, err);
                }
            });

            const wattage = extractWattage();
            const { totalPrice, totalCurrency } = extractTotalPrice();

            return {
                wattage,
                totalPrice,
                totalCurrency,
                components,
            };
        });

        console.log('Scraped data:', result);
        return result;
    } catch (error) {
        console.error('Failed to scrape:', error);
        throw error;
    } finally {
        if (browser) await browser.close();
    }
};
