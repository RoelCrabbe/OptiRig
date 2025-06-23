import MainPageLayout from '@components/layout/MainPageLayout';
import Button from '@components/ui/Button';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import FeatureCard from '@components/ui/container/FeatureCard';
import { ROUTES } from '@config/routes';
import { getUserFeatures } from '@config/userConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOptionalAuth } from '@hooks/useAuthGuard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const userFeatures = getUserFeatures();

const Home: React.FC = () => {
    const router = useRouter();
    const currentUser = useOptionalAuth();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <MainPageLayout pageName={'Home'}>
            <Column gap={'16'}>
                <Card>
                    <Container easeIn isVisible={isVisible} className={`max-w-6xl mx-auto py-16`}>
                        <Column className={'items-center text-center'}>
                            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                                Welcome to <span className="text-blue-600">OptiRig</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto text-center">
                                The professional customer management platform that streamlines your
                                business operations and enhances customer relationships.
                            </p>
                            {!currentUser.isAuthenticated && (
                                <Button.Primary
                                    onClick={() => router.push(ROUTES.AUTH.REGISTER)}
                                    size="lg">
                                    Get Started
                                </Button.Primary>
                            )}
                        </Column>
                    </Container>
                </Card>

                <Column gap={'8'} className="max-w-6xl mx-auto w-full">
                    <Column className={'items-center text-center'}>
                        <h2 className="text-3xl font-semibold text-gray-900">
                            Everything you need to manage customers
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            OptiRig provides all the tools and features necessary to build stronger
                            customer relationships and grow your business.
                        </p>
                    </Column>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userFeatures.map((feature) => (
                            <FeatureCard
                                key={feature.id}
                                easeIn
                                isVisible={isVisible}
                                className={'!cursor-default'}>
                                <span className="text-blue-600">
                                    <FontAwesomeIcon icon={feature.icon} size={'xl'} />
                                </span>
                                <h3 className="text-lg font-medium text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </FeatureCard>
                        ))}
                    </div>
                </Column>
            </Column>
        </MainPageLayout>
    );
};

export default Home;
