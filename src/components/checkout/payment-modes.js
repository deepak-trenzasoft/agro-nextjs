import Error from "./error";

const PaymentModes = ( { input, handleOnChange , paymentMethods } ) => {
	
	const { errors, paymentMethod } = input || {}

	const activePaymentMethods = paymentMethods.filter((obj) => {
		return obj.enabled === true;
	});
	
	return (
		<div className="mt-3">
			<h2>payment Method</h2>
			<Error errors={ errors } fieldName={ 'paymentMethod' }/>
			{
				activePaymentMethods.length ? activePaymentMethods.map( activePaymentMethod => {
					return (
						<div key={ activePaymentMethod?.id } className="form-check woo-next-payment-input-container mt-2">
							<label className="form-check-label">
								<input onChange={ handleOnChange } value={activePaymentMethod.id} className="form-check-input mr-3" name="paymentMethod" type="radio" checked={activePaymentMethod.id === paymentMethod}/>
								<span className="woo-next-payment-content">{ activePaymentMethod.title }</span>
							</label>
						</div>
					)
				} ) : null
			}

			{/*	Payment Instructions*/}
			<div className="woo-next-checkout-payment-instructions mt-2">
				{
					activePaymentMethods.length ? activePaymentMethods.map( activePaymentMethod => {
						return paymentMethod === activePaymentMethod.id  ? activePaymentMethod.description : null
					} ) : null
				}
			</div>
		</div>
	);
};

export default PaymentModes;
