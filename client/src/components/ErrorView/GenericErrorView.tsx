function GenericErrorView({ additionalMessage = "" }) {
  return (
    <div>
      <p>There was an error.</p>
      { additionalMessage && <p>{additionalMessage}</p> }
    </div>
  );
}

export default GenericErrorView;
