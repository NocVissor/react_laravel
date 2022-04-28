import Cart from '../../template/Default/Cart.jsx';
import { useState, useEffect } from 'react';
import Pagination from "react-js-pagination";
export default ()=>{
    const [stateUsers, setUsers] = useState([]);
    const [stateCount, setCount] = useState(0);
    const [statePage, setPage] = useState(1);
    const pageSize = 20;

    function updateCount() {
        window.api.get('/admin/users/count')
        .then(responce=>{
            setCount(responce.count);
            updateUsers();
        })
        .catch(e=>{});
    }

    function updatePage(page){
        setPage(page);
    }

    function updateUsers() {
        window.api.get('/admin/users/all', {count:pageSize, page: statePage})
        .then(responce=>{
            setUsers(responce.users);
        })
        .catch(e=>{});
    }


    const Effect = true;
    useEffect(()=>{
        window.first = true;
        window.add_init(()=>{
            if(noAjax && typeof count !== 'undefined' && typeof users !== 'undefined'){
                noAjax = false;
                setUsers(users);
                setCount(count);
            }
            else{
                updateCount();
            }
        });
    }, [Effect]);

    useEffect(()=>{
        if(!window.first){
            updateUsers();
        }
        window.first = false;
    }, [statePage]);
    return (
        <Cart header="Пользователи" col={12} body={
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">роль</th>
                            <th scope="col">имя</th>
                            <th scope="col">почта</th>
                            <th scope="col">действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stateUsers.map(user=>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.role}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td></td>
                            </tr>
                        )}

                    </tbody>
                </table>


                <Pagination
                    activePage={statePage}
                    itemsCountPerPage={pageSize}
                    totalItemsCount={stateCount}
                    onChange={updatePage}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            </>
        }/>
    );
}
