export default function Head() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1"></div>

        <div className=" lg:flex lg:gap-x-12">
          <img className="h-10 w-auto" src="./img/test2.png" alt="" />
          <br />
          <br /> <br />
          <br />
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </nav>
    </header>
  );
}
