function Cart(props){
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className={props.col}>
                    <div className="card">
                        <div className="card-header">
                            {props.header}
                        </div>
                        <div className="card-body">
                            {props.body}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Cart.defaultProps = {
    col: 'col-md-8'
}

export default Cart;
