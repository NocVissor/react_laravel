export default ()=>{


    let result = '';
    if(typeof statusVerify !== 'indefined'){
        if(statusVerify == 'already'){
            result = 'Ваша почта уже подтверждена';
        }
        else if(statusVerify == 'success'){
            result = 'Почта успешно подтверждена';
        }
    }

    return <>
        {result}
    </>
}
