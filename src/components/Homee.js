import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./../styles/home4.module.css";
import shape1 from "../public/assets/images/shape-1.png";
import shape2 from "../public/assets/images/shape-2.png";
import shape3 from "../public/assets/images/shape-3.png";
import shape4 from "../public/assets/images/shape-4.png";
import shape5 from "../public/assets/images/shape-7.png";
import shape6 from "../public/assets/images/zz.png";
import shape7 from "../public/assets/images/zzz.png";
import shape8 from "../public/assets/images/logo-footer.png";
import bannerline from "../public/assets/images/banner-line.png";
import bannerimgbg from "../public/assets/images/banner-img-bg.png";
import bannerimg from "../public/assets/images/15.png";
import banneralimenticon1 from "../public/assets/images/banner-aliment-icon-1.png";
import banneralimenticon2 from "../public/assets/images/banner-aliment-icon-2.png";
import banneralimenticon3 from "../public/assets/images/banner-aliment-icon-3.png";
import banneralimenticon4 from "../public/assets/images/banner-aliment-icon-4.png";
import Image from "next/image";
import Link from "next/link";

const Homee = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <section className={styles.home22}>
        <div className={styles.shape}>
          <div className={styles.shape1}>
            <Image src={shape1} alt="art shape" width={70} />
          </div>
          <div className={styles.shape2}>
            <Image src={shape2} alt="art shape" width={70} height={55} />
          </div>
          <div className={styles.shape3}>
            <Image src={shape3} alt="art shape" width={300} />
          </div>
          <div className={styles.shape4}>
            <Image src={shape4} alt="art shape" width={50} height={64} />
          </div>
          {/* <div className={styles.shape6}>
            <Image src={shape6} alt="art shape" width={222} height={222} />
          </div> */}
          {/* <div className={styles.shape5}>
            <Image src={shape5} alt="art shape" width={222} height={222} />
          </div>
          <div className={styles.shape8}>
            <Image src={shape8} alt="art shape" width={92} height={30} />
          </div>
          <div className={styles.shape7}>
            <Image src={shape7} alt="art shape" width={192} height={192} />
          </div> */}
        </div>
        <div className={styles.homeleft}>
          <p className={styles.stitle}>Welcome To One line</p>

          <h1
            className={styles.mainheading}
            data-aos="fade-right"
            data-aos-duration="900"
          >
            Get a Class From Top
            {/* <Typical
              steps={['Get a Class From Top', 1000, 'Get a Class From Top !', 500]}
              loop={Infinity}
              wrapper="p"
            /> */}
            <span className={styles.underlineimg}>
              Instructor{" "}
              <span>
                <Image
                  src={bannerline}
                  alt="line"
                  width="302px"
                  height="auto"
                />
              </span>
            </span>
          </h1>
          <p className={styles.sectiontext}>
            Integer in magna in est ultrices bibendum eget enim et dui
            imperdiet faucibus. Fusce eu tristique felis.
          </p>
          <div className={styles.homebtngroup}>
            <Link href="/courses">
              <button
                className={styles.btnbtnprimary}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={styles.btntext}>Explore Courses</p>
                <span className={styles.square}></span>
              </button>
            </Link>
            <Link href="/aboutus">
              <button
                className={styles.btnbtnsecondary}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={styles.btntext}>Contact Us</p>
                <span className={styles.square}></span>
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.homeright}>
          <div className={styles.imgbox}>
            {/* <Image src={bannerimgbg} alt="colorful background shape" className={styles.backgroundshape} /> */}
            <Image
              src={bannerimg}
              alt="banner image"
              className={styles.bannerimg}
              height={657}
              width={395}
            />
            <div className={styles.icon}>
              <div className={styles.icon1}>
                <Image
                  src={banneralimenticon1}
                  alt=""
                  width={212}
                  height={55}
                />
              </div>
              <div className={styles.icon2}>
                <Image
                  src={banneralimenticon2}
                  alt=""
                  width={212}
                  height={55}
                />
              </div>
              <div className={styles.icon3}>
                <Image
                  src={banneralimenticon3}
                  alt=""
                  width={192}
                  height={55}
                />
              </div>
              <div className={styles.icon4}>
                <Image src={banneralimenticon4} alt="" />
              </div>
            </div>
          </div>
          {/* <About1/> */}
        </div>
        {/* <div className={styles.sert}>v c
        <Image src={bannerimgbg} alt="colorful background shape" className={styles.backgroundshape}/>
        </div> */}
        <div className={styles.sert}>
          <Image
            src={bannerimgbg}
            alt="colorful background shape"
            className={styles.backgroundshape1}
          />
        </div>
      </section>
    </>
  );
};

export default Homee;
