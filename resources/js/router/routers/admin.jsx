import routes from '../routes';
import { Route, Navigate  } from 'react-router-dom';
import Admin from '../../middleware/admin';
import UsersList from '../../components/admin/users/all.jsx';

export default (<>
        <Route path={routes.admin.users} element={
            <Admin Yes={()=>
                <UsersList/>
            } No={()=>
                <Navigate to={routes.unAuth} />
            } />
        } />
</>);
