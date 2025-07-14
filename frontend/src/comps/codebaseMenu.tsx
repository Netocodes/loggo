import FlowingMenu from "../blocks/Components/FlowingMenu/FlowingMenu";


const CodeBase = () => {
    const demoItems = [
    {
      link: "#",
      text: "React",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      link: "#",
      text: "Node Js",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      link: "#",
      text: "Express Js",
      image: "https://picsum.photos/600/400?random=3",
    },
    {
      link: "#",
      text: "PostgresQl",
      image: "https://picsum.photos/600/400?random=4",
    },
    {
      link: "#",
      text: "TypeScript",
      image: "https://picsum.photos/600/400?random=5",
    },
    {
      link: "#",
      text: "Database Management",
      image: "https://picsum.photos/600/400?random=6",
    },
  ];
  return (
    <div>
      <h2 className="w-full max-w-3xl text-gray-400 font-semibold text-sm md:text-xl text-center mx-auto py-6 px-4 mt-8">
            This Top languages and tools were used to build Loggo making it able to scale up to 100k+ users Dont Play😉.
          </h2>
          <div
            className="w-full text-gray-300"
            style={{ height: "600px", position: "relative" }}
          >
            <FlowingMenu items={demoItems} />
          </div>
    </div>
  )
}

export default CodeBase;
