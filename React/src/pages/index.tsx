import React, { useEffect, useState } from 'react';

// Types
interface PcPart {
    category: string;
    name: string;
    imageUrl: string;
    pcpartpicker: {
        price: number;
        currency: string;
        url: string;
        buyLink: string;
    };
}

interface SearchOptions {
    region: string;
    listId: string;
}

// Constants
const API_BASE_URL = '/parts'; // Adjust this to your actual API endpoint

const categoryIcons = {
    CPU: 'fas fa-microchip',
    'CPU Cooler': 'fas fa-fan',
    Motherboard: 'fas fa-memory',
    Memory: 'fas fa-memory',
    Storage: 'fas fa-hdd',
    'Video Card': 'fas fa-display',
    Case: 'fas fa-cube',
    'Power Supply': 'fas fa-plug',
    PSU: 'fas fa-plug',
};

const categoryClasses = {
    CPU: 'cpu-icon',
    'CPU Cooler': 'cooler-icon',
    Motherboard: 'motherboard-icon',
    Memory: 'memory-icon',
    Storage: 'storage-icon',
    'Video Card': 'video-icon',
    Case: 'case-icon',
    'Power Supply': 'psu-icon',
    PSU: 'psu-icon',
};

// Utility functions
const getIconForCategory = (category: string): string => {
    return categoryIcons[category as keyof typeof categoryIcons] || 'fas fa-cog';
};

const getClassForCategory = (category: string): string => {
    return categoryClasses[category as keyof typeof categoryClasses] || 'cpu-icon';
};

const formatPrice = (price: number, currency: string): string => {
    const symbol = currency === 'EUR' ? '€' : '$';
    return `${symbol}${price.toFixed(2)}`;
};

// Components
const SearchForm: React.FC<{
    onSearch: (options: SearchOptions) => void;
    loading: boolean;
}> = ({ onSearch, loading }) => {
    const [listId, setListId] = useState('');
    const [region, setRegion] = useState('US');

    const handleSubmit = () => {
        if (listId.trim()) {
            onSearch({ region, listId: listId.trim() });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="search-form">
            <div className="form-group">
                <label htmlFor="listId">List ID:</label>
                <input
                    type="text"
                    id="listId"
                    value={listId}
                    onChange={(e) => setListId(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter PC Part Picker list ID"
                    disabled={loading}
                />

                <label htmlFor="region">Region:</label>
                <select
                    id="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    disabled={loading}>
                    <option value="US">United States</option>
                    <option value="DE">Germany</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                </select>

                <button onClick={handleSubmit} className="btn" disabled={loading}>
                    <i className="fas fa-search"></i> Search Parts
                </button>
            </div>
        </div>
    );
};

const PartCard: React.FC<{ part: PcPart }> = ({ part }) => {
    const iconClass = getIconForCategory(part.category);
    const categoryClass = getClassForCategory(part.category);

    return (
        <div className="part-card">
            <div className="part-header">
                <div className={`category-icon ${categoryClass}`}>
                    <i className={iconClass}></i>
                </div>
                <div className="part-category">{part.category}</div>
            </div>
            <div className="part-content">
                <div className="part-image">
                    <img src={part.imageUrl} alt={part.name} />
                </div>
                <div className="part-details">
                    <div className="part-name">{part.name}</div>
                    <div className="part-price">
                        <span className="price-value">
                            {formatPrice(part.pcpartpicker.price, part.pcpartpicker.currency)}
                        </span>
                    </div>
                    <div className="part-actions">
                        <a
                            href={part.pcpartpicker.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-small btn-secondary">
                            <i className="fas fa-external-link-alt"></i> View Details
                        </a>
                        <a
                            href={part.pcpartpicker.buyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-small btn-primary">
                            <i className="fas fa-shopping-cart"></i> Buy Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PartsOverview: React.FC<{ parts: PcPart[] }> = ({ parts }) => {
    if (parts.length === 0) {
        return (
            <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
                No parts found for this list ID.
            </div>
        );
    }

    return (
        <div className="parts-overview">
            {parts.map((part, index) => (
                <PartCard key={index} part={part} />
            ))}
        </div>
    );
};

const TotalPrice: React.FC<{ parts: PcPart[] }> = ({ parts }) => {
    const calculateTotal = (parts: PcPart[]): number => {
        return parts.reduce((total, part) => {
            // Convert EUR to USD for calculation (rough conversion)
            const priceInUSD =
                part.pcpartpicker.currency === 'EUR'
                    ? part.pcpartpicker.price * 1.1
                    : part.pcpartpicker.price;
            return total + priceInUSD;
        }, 0);
    };

    const total = calculateTotal(parts);

    return (
        <div className="total-price">
            <h3>
                <i className="fas fa-calculator"></i> Total Build Cost
            </h3>
            <div className="total-amount">{formatPrice(total, 'USD')}</div>
        </div>
    );
};

const LoadingSpinner: React.FC = () => (
    <div className="loading">
        <i className="fas fa-spinner"></i> Loading parts...
    </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="error">{message}</div>
);

// Main App Component
const PCPartsApp: React.FC = () => {
    const [parts, setParts] = useState<PcPart[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    // Sample data for demo
    const sampleData: PcPart[] = [
        {
            category: 'CPU',
            name: 'AMD Ryzen 9 7900X 4.7 GHz 12-Core Processor',
            imageUrl:
                'https://cdna.pcpartpicker.com/static/forever/images/product/8de723005cfc1b85071c4abf4d76bd4e.256p.jpg',
            pcpartpicker: {
                price: 319.97,
                currency: 'USD',
                url: 'https://de.pcpartpicker.com/product/bwxRsY/amd-ryzen-9-7900x-47-ghz-12-core-processor-100-100000589wof',
                buyLink:
                    'https://www.amazon.com/dp/B0BBJ59WJ4?tag=pcpapi-20&linkCode=ogi&th=1&psc=1',
            },
        },
        {
            category: 'CPU Cooler',
            name: 'Thermalright Peerless Assassin 120 SE 66.17 CFM CPU Cooler',
            imageUrl: 'https://m.media-amazon.com/images/I/41hFTmi5aUL.jpg',
            pcpartpicker: {
                price: 34.9,
                currency: 'USD',
                url: 'https://de.pcpartpicker.com/product/hYxRsY/thermalright-peerless-assassin-120-se-6617-cfm-cpu-cooler-pa120-se-d3',
                buyLink:
                    'https://www.amazon.com/dp/B09LGY38L4?tag=pcpapi-20&linkCode=ogi&th=1&psc=1',
            },
        },
        {
            category: 'Motherboard',
            name: 'MSI B650 GAMING PLUS WIFI ATX AM5 Motherboard',
            imageUrl:
                'https://cdna.pcpartpicker.com/static/forever/images/product/ff33ebb87ed9f5fa5f9c54d6d316ae82.256p.jpg',
            pcpartpicker: {
                price: 159.99,
                currency: 'USD',
                url: 'https://de.pcpartpicker.com/product/szfxFT/msi-b650-gaming-plus-wifi-atx-am5-motherboard-b650-gaming-plus-wifi',
                buyLink:
                    'https://click.linksynergy.com/deeplink?id=8BacdVP0GFs&mid=44583&murl=https%3A%2F%2Fwww.newegg.com%2Fmsi-b650-gaming-plus-wifi-atx-motherboard-amd-b650-am5%2Fp%2FN82E16813144628',
            },
        },
        {
            category: 'Memory',
            name: 'Corsair Vengeance 32 GB (2 x 16 GB) DDR5-6000 CL30 Memory',
            imageUrl:
                'https://cdna.pcpartpicker.com/static/forever/images/product/fe414d3559a9bbb2e092ba5374f6e1ed.256p.jpg',
            pcpartpicker: {
                price: 119.99,
                currency: 'USD',
                url: 'https://de.pcpartpicker.com/product/JkfxFT/corsair-vengeance-32-gb-2-x-16-gb-ddr5-6000-cl30-memory-cmk32gx5m2b6000c30',
                buyLink:
                    'https://www.amazon.com/dp/B0C3RYHZJQ?tag=pcpapi-20&linkCode=ogi&th=1&psc=1',
            },
        },
        {
            category: 'Storage',
            name: 'Samsung 990 Pro 2 TB M.2-2280 PCIe 4.0 X4 NVME Solid State Drive',
            imageUrl:
                'https://cdna.pcpartpicker.com/static/forever/images/product/55fb148a837f9e33dfdb095188af8a74.256p.jpg',
            pcpartpicker: {
                price: 149.99,
                currency: 'USD',
                url: 'https://de.pcpartpicker.com/product/34ytt6/samsung-990-pro-2-tb-m2-2280-pcie-40-x4-nvme-solid-state-drive-mz-v9p2t0bw',
                buyLink:
                    'https://www.anrdoezrs.net/click-3938566-13489155?url=https%3A%2F%2Fwww.abt.com%2FSamsung-990-PRO-2TB-PCIe-4.0-NVMe-SSD-MZV9P2T0BAM%2Fp%2F215957.html&cjsku=215957',
            },
        },
        {
            category: 'Video Card',
            name: 'Gigabyte GAMING OC Radeon RX 9060 XT 16 GB Video Card',
            imageUrl:
                'https://cdna.pcpartpicker.com/static/forever/images/product/867a636cde1c3c9762b06bde17acd022.256p.jpg',
            pcpartpicker: {
                price: 389.99,
                currency: 'USD',
                url: 'https://de.pcpartpicker.com/product/TcG2FT/gigabyte-gaming-oc-radeon-rx-9060-xt-16-gb-video-card-gv-r9060xtgaming-oc-16gd',
                buyLink:
                    'https://www.amazon.com/dp/B0F91KM1CK?tag=pcpapi-20&linkCode=ogi&th=1&psc=1',
            },
        },
        {
            category: 'Case',
            name: 'Corsair 4000D Airflow ATX Mid Tower Case',
            imageUrl:
                'https://cdna.pcpartpicker.com/static/forever/images/product/bc6e987da3fe22c616898d1d7fa3d227.256p.jpg',
            pcpartpicker: {
                price: 94.99,
                currency: 'USD',
                url: 'https://de.pcpartpicker.com/product/bCYQzy/corsair-4000d-airflow-atx-mid-tower-case-cc-9011200-ww',
                buyLink: 'https://api.bestbuy.com/click/-/6424213/pdp?IPID=79301',
            },
        },
        {
            category: 'Power Supply',
            name: 'Corsair RM850e (2023) 850 W 80+ Gold Certified Fully Modular ATX Power Supply',
            imageUrl:
                'https://cdna.pcpartpicker.com/static/forever/images/product/74e6caafd69bcc53d6e5060a3249248d.256p.jpg',
            pcpartpicker: {
                price: 129.99,
                currency: 'USD',
                url: 'https://de.pcpartpicker.com/product/4ZRwrH/corsair-rm850e-2023-850-w-80-gold-certified-fully-modular-atx-power-supply-cp-9020263-na',
                buyLink: 'https://api.bestbuy.com/click/-/6589937/pdp?IPID=79301',
            },
        },
    ];

    useEffect(() => {
        // Load sample data on component mount for demo
        setParts(sampleData);
    }, []);

    const handleSearch = async (searchOptions: SearchOptions) => {
        setLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchOptions),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const fetchedParts = await response.json();
            setParts(fetchedParts);
        } catch (err) {
            console.error('Error fetching parts:', err);
            setError('Failed to fetch parts. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
            <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
          color: white;
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .search-form {
          background: rgba(255, 255, 255, 0.95);
          padding: 25px;
          border-radius: 15px;
          margin-bottom: 30px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
        }

        .form-group {
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
        }

        .form-group input, .form-group select {
          padding: 12px 15px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus, .form-group select:focus {
          outline: none;
          border-color: #667eea;
        }

        .btn {
          padding: 12px 25px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s ease;
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading {
          text-align: center;
          color: white;
          font-size: 1.2rem;
          padding: 40px;
        }

        .loading i {
          animation: spin 1s linear infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error {
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid #ff6b6b;
          color: #ff6b6b;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
        }

        .parts-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .part-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .part-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        .part-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(45deg, #667eea, #764ba2);
        }

        .part-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .category-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-size: 1.5rem;
          color: white;
        }

        .cpu-icon { background: linear-gradient(45deg, #ff6b6b, #ee5a24); }
        .memory-icon { background: linear-gradient(45deg, #4ecdc4, #44bd87); }
        .storage-icon { background: linear-gradient(45deg, #45b7d1, #96ceb4); }
        .video-icon { background: linear-gradient(45deg, #f093fb, #f5576c); }
        .motherboard-icon { background: linear-gradient(45deg, #4facfe, #00f2fe); }
        .case-icon { background: linear-gradient(45deg, #43e97b, #38f9d7); }
        .psu-icon { background: linear-gradient(45deg, #fa709a, #fee140); }
        .cooler-icon { background: linear-gradient(45deg, #a8edea, #fed6e3); }

        .part-category {
          font-size: 0.9rem;
          color: #666;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .part-content {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .part-image {
          flex-shrink: 0;
        }

        .part-image img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid #f1f3f4;
        }

        .part-details {
          flex: 1;
        }

        .part-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .part-price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .price-value {
          font-size: 1.3rem;
          font-weight: 700;
          color: #27ae60;
        }

        .part-actions {
          display: flex;
          gap: 10px;
        }

        .btn-small {
          padding: 8px 15px;
          font-size: 0.85rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
        }

        .btn-secondary {
          background: #f8f9fa;
          color: #495057;
          border: 1px solid #dee2e6;
        }

        .btn-small:hover {
          transform: translateY(-1px);
        }

        .total-price {
          background: rgba(255, 255, 255, 0.95);
          padding: 25px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
        }

        .total-price h3 {
          color: #333;
          margin-bottom: 15px;
          font-size: 1.5rem;
        }

        .total-amount {
          font-size: 2.5rem;
          font-weight: 700;
          color: #27ae60;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .parts-overview {
            grid-template-columns: 1fr;
          }
          
          .form-group {
            flex-direction: column;
            align-items: stretch;
          }
          
          .part-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

            <div className="container">
                <div className="header">
                    <h1>
                        <i className="fas fa-desktop"></i> PC Parts Overview
                    </h1>
                    <p>Find and compare PC components</p>
                </div>

                <SearchForm onSearch={handleSearch} loading={loading} />

                {loading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}

                {(parts.length > 0 || hasSearched) && !loading && (
                    <div>
                        <PartsOverview parts={parts} />
                        {parts.length > 0 && <TotalPrice parts={parts} />}
                    </div>
                )}
            </div>
        </>
    );
};

export default PCPartsApp;
