import Badge from '@components/ui/container/Badge';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import Row from '@components/ui/container/Row';
import UserAvatar from '@components/ui/UserAvatar';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { capitalizeFirstLetter } from '@lib';
import { getUserRoleColor, getUserStatusColor, getUserStatusIcon, User } from '@types';

interface Props {
    user: User;
}

const UserEditModalHeader: React.FC<Props> = ({ user }) => {
    return (
        <Card className={'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative'}>
            <Container className={`p-4`}>
                <Column className={'items-center'}>
                    <UserAvatar user={user} size={'lg'} />
                    <Column className={'items-center'} gap={'0'}>
                        <h4 className="text-lg font-semibold text-white tracking-tight">
                            {user.firstName} {user.lastName}
                        </h4>
                        <span className="text-sm text-blue-100">@{user.userName}</span>
                    </Column>
                    <Row>
                        <Badge
                            size={'sm'}
                            text={capitalizeFirstLetter(user.role)}
                            icon={faShieldAlt}
                            color={getUserRoleColor(user.role)}
                        />
                        <Badge
                            size={'sm'}
                            text={capitalizeFirstLetter(user.status)}
                            icon={getUserStatusIcon(user.status)}
                            color={getUserStatusColor(user.status)}
                        />
                    </Row>
                </Column>
            </Container>
        </Card>
    );
};

export default UserEditModalHeader;
