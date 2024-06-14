function CheckoutForm({ addressProps, setAddressProp }) {
  const { phoneNumber, streetAddress, postalCode, city } = addressProps;

  return (
    <>
      <label>Phone</label>
      <input
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={(ev) => setAddressProp("phoneNumber", ev.target.value)}
      />
      <label>Street Address</label>
      <input
        type="text"
        placeholder="Street Address"
        value={streetAddress}
        onChange={(ev) => setAddressProp("streetAddress", ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProp("city", ev.target.value)}
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(ev) => setAddressProp("postalCode", ev.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default CheckoutForm;
