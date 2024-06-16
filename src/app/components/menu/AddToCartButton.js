function AddToCartButton({ onClick, item }) {
  const hasCustomizations = item.sizes?.length > 0 || item.extraIngredients > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 w-auto mx-auto bg-primary text-white rounded-full px-8 py-2"
    >
      {hasCustomizations ? (
        <span>{`From $${item.price}`}</span>
      ) : (
        <span>{`Add to cart $${item.price}`}</span>
      )}
    </button>
  );
}

export default AddToCartButton;
