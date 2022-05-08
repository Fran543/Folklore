export default function Warning({parentToChild}) {
  console.log(parentToChild)
  return (
    <div className="btnWarning">
      <p id={parentToChild}>{parentToChild}</p>
      <i className="bx bx-x icon"></i>
    </div>
  );
}
