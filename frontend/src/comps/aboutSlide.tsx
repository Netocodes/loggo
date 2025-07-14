import CardSwap, { Card } from "../blocks/Components/CardSwap/CardSwap";
import Background from "../assets/registerPage.png"
import Background2 from "../assets/loginss.png"
const AboutSlide = () => {
  
 
  return (
    <div>
      <div className="relative shadow-lg rounded-lg h-[60dvh] md:h-[85dvh] text-gray-300 bg-gray-800  overflow-hidden  ">
        <div className="absolute rounded-lg top-8 md:top-20 px-6 md:pl-12 py-6 backdrop-blur-lg">
          <h1 className="text-3xl font-semibold">
            Built for simplicity, Scalability & <br /> Security.
          </h1>
          <div className="">
            <p className="text-lg text-left my-4">
            Working on Loggo i perfected my skills 👇👇👇: 
          </p>
          <ul className="flex flex-col gap-y-4">
            <li> ✔️ PostgresQl data Input and Manipulation</li>
            <li> ✔️ Authentication Middlewares Node.js</li>
            <li> ✔️ Protected Routes Frontend</li>
            <li> ✔️ JWT token authorization</li>
          </ul>
          </div>
       
        </div>

        <div className="hidden md:flex ">
          <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={3000}
          pauseOnHover={true}
          width={550}
          height={310}
        >
          <Card className={``}>
            <h3 className="p-2 px-4 text-xl text-white">Register</h3>
            <div className=" px-2">
              <img src={Background} className="h-[260px] w-full object-cover  " alt="register Image" />
            </div>
          </Card>
          <Card className={``}>
            <h3 className="p-2 px-4 text-xl text-white">Login as a User</h3>
            <div className=" px-2">
              <img src={Background2} className="h-[260px] w-full object-cover  " alt="register Image" />
            </div>
          </Card>
          <Card className={``}>
            <h3 className="p-2 px-4 text-xl text-white">Access Secure Page</h3>
            <div className=" px-2">
              <img src={Background} className="h-[260px] w-full object-cover  " alt="register Image" />
            </div>
          </Card>
          
        </CardSwap>
        </div>
      </div>
    </div>
  );
};

export default AboutSlide;
