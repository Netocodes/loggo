import HeroSection from "./herosection"
import FeaturesPage from "./features"
import Contact from "./contact"
import BlobCursor from "../blocks/Animations/BlobCursor/BlobCursor"
import AboutSlide from "./aboutSlide"
import CodeBase from "./codebaseMenu"

const Homepage = () => {
  return (
    <div className="px-1 bg-gray-900">
          <div className="relative">
            <BlobCursor
  blobType="circle"
  fillColor="#000000"
  trailCount={3}
  sizes={[60, 125, 75]}
  innerSizes={[20, 35, 25]}
  innerColor="rgba(255,255,255,0.8)"
  opacities={[0.6, 0.6, 0.6]}
  shadowColor="rgba(0,0,0,0.75)"
  shadowBlur={5}
  shadowOffsetX={10}
  shadowOffsetY={10}
  filterStdDeviation={30}
  useFilter={true}
  fastDuration={0.1}
  slowDuration={0.5}
  zIndex={1000}
/>
          </div>
      <HeroSection />
      <FeaturesPage />
      <AboutSlide />
      <CodeBase />
      <Contact />
      {/* <Footer /> */}
    </div>
  )
}

export default Homepage
