import HorizontalCards from "./horizontal-cards";

const FeaturesPage = () => {
  
  return (
    <div>
      <div className="w-full md:max-w-[80%] mx-auto my-8 text-gray-200 py-8 ">
        <div className="flex flex-col items-center  gap-4">
          <h1 className="text-2xl md:text-4xl text-center ">How Loggo Works</h1>
          <p className="text-center px-3 text-md md:text-xl">
            An Authentication system built to be bulletProof, secure, and easy
            to use. <br />
            Crafted by NetoCodes with: React Js, PostgresQl, Node Js, JWT,
            Express js... and more.
          </p>

          <HorizontalCards />

          
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
