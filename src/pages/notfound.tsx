import error from "../assets/images/folder.png";

export default function Error() {
  return (
    <div>
      <h1>Page not found</h1>
      <img src={error} alt="error"></img>
    </div>
  );
}
