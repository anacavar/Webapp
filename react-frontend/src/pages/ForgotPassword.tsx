function ForgotPassword() {
  const handleSubmit = (e: any) => {};
  return (
    <>
      <section>
        <h1>Password recovery</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email"></input>
          <button>Send recovery email</button>
          <p>
            <a href="/">Back to login</a>
          </p>
        </form>
      </section>
    </>
  );
}

export default ForgotPassword;
