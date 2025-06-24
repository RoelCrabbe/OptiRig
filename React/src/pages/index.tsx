import MainPageLayout from '@components/layout/MainPageLayout';
import Button from '@components/ui/Button';
import Card from '@components/ui/container/Card';
import Centered from '@components/ui/container/Centered';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import FeatureCard from '@components/ui/container/FeatureCard';
import Row from '@components/ui/container/Row';
import InputField from '@components/ui/InputField';
import InputSelect from '@components/ui/InputSelect';
import StatusMessage from '@components/ui/StatusMessage';
import {
    faBolt,
    faDollarSign,
    faExternalLink,
    faShoppingCart,
    faSitemap,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOptionalAuth } from '@hooks/useAuthGuard';
import { useEntity } from '@hooks/useEntity';
import { handleErrorLabel } from '@lib';
import { ComponentListType, RegionCode } from '@roelcrabbe/optirig-types';
import { partService } from '@services/index';
import { getPcPartCategoryClass, getPcPartCategoryIcon, LabelMessage } from '@types';
import { extractListId, validatePartPickerUrl, validateRegionCode } from '@validators/parts';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    useOptionalAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [partPickerUrl, setPartPickerUrl] = useState<string | null>(null);
    const [region, setRegion] = useState<RegionCode | null>(RegionCode.US);
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const { entity, setEntity } = useEntity<ComponentListType>();

    const validate = (): boolean => {
        const errors = [validatePartPickerUrl(partPickerUrl), validateRegionCode(region)].filter(
            Boolean,
        );

        if (errors.length > 0) {
            handleErrorLabel(errors[0], setLabelMessage);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLabelMessage(undefined);

        setIsButtonDisabled(true);

        if (!validate()) {
            setIsButtonDisabled(false);
            return;
        }

        const listId = extractListId(partPickerUrl!);
        if (!listId) {
            setLabelMessage({
                label: 'Unexpected Error',
                message: 'Error extracting build id...',
                type: 'error',
            });
            return;
        }

        const componentData: any = {
            listId,
            region,
        };

        try {
            const componentResponse = await partService.getComponents(componentData);
            const componentJson = await componentResponse.json();

            if (!componentResponse.ok) {
                handleErrorLabel(componentJson.message, setLabelMessage);
                return;
            }

            setEntity(componentJson);
        } catch (error) {
            handleErrorLabel(error, setLabelMessage);
        }

        setIsButtonDisabled(false);
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <MainPageLayout pageName={'Home'}>
            <Column gap={'16'}>
                <Card>
                    <Container easeIn isVisible={isVisible} className="max-w-6xl mx-auto py-16">
                        <Column className="items-center">
                            <Column className="items-center">
                                <FontAwesomeIcon
                                    icon={faSitemap}
                                    className={'text-blue-600'}
                                    size={'3x'}
                                />
                                <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                                    Opti<span className="text-blue-600">Rig</span>
                                </h1>
                            </Column>
                            <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto text-center">
                                Upload your PCPartPicker build and let OptiRig find better prices
                                across top online retailers. Save money by automatically comparing
                                components from trusted stores — no manual searching needed.
                            </p>
                        </Column>
                    </Container>
                </Card>

                <Column gap={'8'} className={'max-w-4xl mx-auto w-full'}>
                    <h2 className="text-3xl font-semibold text-gray-900 text-center">
                        Find Better Prices
                    </h2>

                    <Card className={'p-8'}>
                        <Container easeIn isVisible={isVisible} className={'max-w-6xl mx-auto'}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <InputField
                                    type={'text'}
                                    label={'PCPartPicker Build URL'}
                                    value={partPickerUrl}
                                    onChange={setPartPickerUrl}
                                    validate={validatePartPickerUrl}
                                    placeholder={'https://pcpartpicker.com/list/...'}
                                    required
                                />

                                <InputSelect<RegionCode>
                                    label={'Region'}
                                    value={region}
                                    onChange={setRegion}
                                    validate={validateRegionCode}
                                    enumObject={RegionCode}
                                    placeholder={'Select your region'}
                                    required={false}
                                />
                            </div>

                            <div className="flex justify-center">
                                <Button.Primary disabled={isButtonDisabled} onClick={handleSubmit}>
                                    Compare Prices
                                </Button.Primary>

                                {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                            </div>
                        </Container>
                    </Card>
                </Column>

                {entity && (
                    <Column gap={'8'} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <Column className="items-center text-center space-y-6">
                            <div>
                                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                                    PC Part Picker Build
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    OptiRig found the following components in your build
                                </p>
                            </div>

                            <div className="flex gap-4 w-full max-w-lg">
                                <div className="bg-blue-100 px-4 py-3 rounded-lg flex items-center gap-3 flex-1">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FontAwesomeIcon
                                            icon={faBolt}
                                            className="text-white text-sm"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-gray-600">Estimated Wattage</p>
                                        <p className="text-xl font-bold text-blue-600">
                                            {entity.wattage}W
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-green-100 px-4 py-3 rounded-lg flex items-center gap-3 flex-1">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FontAwesomeIcon
                                            icon={faDollarSign}
                                            className="text-white text-sm"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-gray-600">Total Cost</p>
                                        <p className="text-xl font-bold text-green-600">
                                            {entity.totalCurrency === 'USD' && '$'}
                                            {entity.totalCurrency === 'EUR' && '€'}
                                            {entity.totalCurrency === 'GBP' && '£'}
                                            {entity.totalPrice.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Column>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {entity.components.map((part) => (
                                <FeatureCard
                                    key={part.id}
                                    easeIn
                                    isVisible={isVisible}
                                    className={'!cursor-default'}>
                                    <Row className={'mb-4'}>
                                        <Centered
                                            className={`w-10 h-10 bg-blue-200 rounded-lg ${getPcPartCategoryClass(part.category)}`}>
                                            <FontAwesomeIcon
                                                icon={getPcPartCategoryIcon(part.category)}
                                                className={'w-6 h-6 text-white'}
                                            />
                                        </Centered>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {part.category}
                                        </h3>
                                    </Row>

                                    <Row>
                                        <div className="flex-shrink-0">
                                            <img
                                                src={part.imageUrl}
                                                alt={part.name}
                                                className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-3">
                                                {part.name}
                                            </p>
                                            <div className="text-2xl font-bold text-green-600">
                                                <span>
                                                    {part.pcpartpicker.currency === 'USD' && '$'}
                                                    {part.pcpartpicker.currency === 'EUR' && '€'}
                                                    {part.pcpartpicker.currency === 'GBP' && '£'}
                                                    {part.pcpartpicker.price.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </Row>

                                    <Row
                                        gap={'2'}
                                        className={'pt-4 border-t border-gray-200 mt-auto'}>
                                        <Button.Secondary
                                            className={'w-full'}
                                            onClick={() =>
                                                window.open(part.pcpartpicker.url, '_blank')
                                            }>
                                            <FontAwesomeIcon icon={faExternalLink} />
                                            View Details
                                        </Button.Secondary>
                                        <Button.Primary
                                            className={'w-full'}
                                            onClick={() =>
                                                window.open(part.pcpartpicker.buyLink, '_blank')
                                            }>
                                            <FontAwesomeIcon icon={faShoppingCart} />
                                            Buy Now
                                        </Button.Primary>
                                    </Row>
                                </FeatureCard>
                            ))}
                        </div>
                    </Column>
                )}
            </Column>
        </MainPageLayout>
    );
};

export default Home;
