'use client';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

import { motion, Variants, useAnimation, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

type AnimatedDetailsProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] // esto sí lo acepta con typing
    }
  }
};

function HeroSection() {
  return (
    <motion.div
      className="p-4 sm:p-14 z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={itemVariants}
        className="font-black text-[#DA121A] text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-teko leading-tight"
      >
        INICIA<br />TU<br />TRANSFORMACIÓN
      </motion.h1>

      {/* <motion.h2
        variants={itemVariants}
        className="font-bold mt-[3vh] sm:mt-6 text-4xl md:text-5xl"
      >
        CON NUESTRO EQUIPO
      </motion.h2> */}

      <motion.p
        variants={itemVariants}
        className="mt-[3vh] sm:mt-6 text-lg xl:text-[21px] text-black font-semibold"
      >
        Si estás listo para comprometerte, yo estoy listo para guiarte. El primer paso lo das hoy.
      </motion.p>
    </motion.div>
  );
}

function HeroCarousel() {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      autoplay={{ delay: 3000 }}
      navigation={{
        nextEl: '.custom-next',
        prevEl: '.custom-prev'
      }}
      loop
      className="w-full h-full"
    >
      <div className="custom-prev absolute bottom-4 left-4 z-10 bg-white/60 text-black w-10 h-10 flex items-center justify-center cursor-pointer">
        <span className="text-2xl">&#10094;</span> {/* ‹ flecha izquierda */}
      </div>
      <div className="custom-next absolute bottom-4 left-16 z-10 bg-white/60 text-black w-10 h-10 flex items-center justify-center cursor-pointer">
        <span className="text-2xl">&#10095;</span> {/* › flecha derecha */}
      </div>
      <SwiperSlide className='w-full bg-black'>
        <img
          src="./S1-R-papita3.jpg"
          alt="Hero 1"
          loading='lazy'
          decoding='async'
          className="object-cover w-full h-screen"
        />
      </SwiperSlide>
      <SwiperSlide className='w-full bg-black'>
        <img
          src="./S1-R-papita4.jpg"
          alt="Hero 2"
          loading='lazy'
          decoding='async'
          className="object-cover w-full h-screen"
        />
      </SwiperSlide>
      {/* Agrega más slides si lo deseas */}
    </Swiper>
  );
}

function AnimatedDetails({ title, children, className }: AnimatedDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`${isDark ? 'bg-gray-300' : 'bg-[#EFECE8] rounded-2xl md:flex justify-center md:w-auto'} p-4 rounded mt-6 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl font-extrabold w-full text-left focus:outline-none"
      >
        <div className='flex justify-between'>
          <div>
            {title}
          </div>
          <div className='pr-8 font-extrabold text-4xl mt-[-10px]'>
            {isOpen ? '-' : '+'}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 text-lg text-black">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function MobileBackgroundCarousel() {
  return (
    <div className="absolute top-0 left-0 w-screen h-[25vh] md:hidden z-0">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 3000 }}
        loop
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev'
        }}
        className="w-full h-screen"
      >
        <div className="custom-prev absolute bottom-4 left-4 z-50 bg-white/60 text-black w-10 h-10 flex items-center justify-center cursor-pointer">
          <span className="text-2xl">&#10094;</span> {/* ‹ flecha izquierda */}
        </div>
        <div className="custom-next absolute bottom-4 left-16 z-50 bg-white/60 text-black w-10 h-10 flex items-center justify-center cursor-pointer">
          <span className="text-2xl">&#10095;</span> {/* › flecha derecha */}
        </div>
        <SwiperSlide className='w-full bg-black'>
          <img
            src="./S1-R-papita3.jpg"
            alt="Slide 1"
            loading='lazy'
            decoding='async'
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide className='w-full bg-black'>
          <img
            src="./S1-R-papita4.jpg"
            alt="Slide 2"
            loading='lazy'
            decoding='async'
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        {/* Agrega más imágenes si deseas */}
      </Swiper>
    </div>
  );
}

function FadeInOnScroll({ children, direction = 'left' }: { children: React.ReactNode; direction?: 'left' | 'right' }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      setOffsetX(isMobile ? 0 : 100);
    }
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.div
      className='flex flex-col justify-start overflow-x-hidden'
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          x: direction === 'left' ? -offsetX : offsetX,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [disabled] = useState(false)
  if (disabled) {
    return <div>404</div>
  }
  return (
    <main className=" text-black w-screen">
      <section className="flex flex-col md:flex-row items-start mb-1 h-screen md:h-screen bg-[#EFECE8]">
        <div className="flex flex-col md:hidden md:w-2/5 opacity-35 h-25 md:h-80">
          <MobileBackgroundCarousel />
        </div>
        <div className="flex flex-col md:w-3/5 md:py-14 z-10 mt-[5vh]">
          <HeroSection />
          <div className='flex justify-center mt-[3vh] md:mt-5 '>
            <a href="https://api.whatsapp.com/send?phone=+51906151954&text=%C2%A1Hola!%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20los%20planes%20de%20entrenamiento."
              className='flex justify-center cursor-pointer' target="_blank" rel="noreferrer">
              <div className="mt-6 bg-[#DA121A] px-6 py-3 rounded-md font-bold font-teko text-xl hover:bg-[#DA121A]">CONTACTANOS AHORA</div>
            </a>
          </div>
        </div>
        <div className="hidden md:flex flex-col md:w-2/5 relative h-64 md:h-auto">
          <HeroCarousel />
        </div>
      </section>

      <section className="flex flex-col md:flex-row md:items-start md:p-12 gap-8 justify-center mx-auto bg-white mt-10 w-screen  max-w-[1800px]">
        <div className='md:w-1/2 self-center'>
          <FadeInOnScroll direction="left">
            <div className="flex gap-4 justify-center mt-20  px-6">
              <div className='flex md:hidden lg:flex'>
                <img src="./S2-L122.jpg" alt="motivacion" width={276} height={406} className="object-cover mb-16" loading='lazy' decoding='async' />
              </div>
              <div className='flex'>
                <img src="./S2-L222.jpg" alt="motivacion" width={276} height={406} className="object-cover mt-16" loading='lazy' decoding='async' />
              </div>
            </div>
          </FadeInOnScroll>
        </div>
        <div className='px-6 md:w-1/2 self-center'>
          <FadeInOnScroll direction="right">
            <h2 className="text-3xl md:text-4xl font-black text-[#DA121A] mt-5">EL MOMENTO A LLEGADO</h2>
            <h3 className="text-2xl font-bold mb-6 mt-4">TRABAJA EN TU MEJOR VERSIÓN!</h3>
            <div className="space-y-4 flex flex-col">
              <AnimatedDetails title="01.  ¿Por qué lo hago?" className='flex flex-col'>
                <p className="mt-2 text-lg text-black">
                  • Ayudar a personas a aprender a cambiar su estilo de vida empezando por lo más importante que es lo que los va a acompañar hasta el fin de sus días, su cuerpo.
                </p>
                <br />
                <p className="mt-2 text-lg text-black">
                  • La fuerza es algo fundamental para la salud y un exceso de grasa puede traer complicaciones muy grande en todo sentido.
                </p>
                <br />
                <p className="mt-2 text-lg text-black">
                  • Además de la autoconfianza que significa mirarse al espejo y sentirse atractivo.
                </p>
                <br />
                <p className="mt-2 text-lg text-black">
                  • En tan solo meses ya verás resultados.
                </p>
              </AnimatedDetails>
              <AnimatedDetails title="02. ¿Qué conlleva el programa?" className='md:hidden'>
                <p className="mt-2 text-lg text-black">
                  • Guía de alimentos
                </p>
                <br />
                <p className="mt-2 text-lg text-black">
                  • Seguimiento con la dieta diaria por WSP
                </p>
                <br />
                <p className="mt-2 text-lg text-black">
                  • Rutina de entrenamiento orientado al objetivo buscado
                </p>
                <br />
                <p className="mt-2 text-lg text-black">
                  • Respuesta a cualquier duda sobre comidas o entrenamiento por chat
                </p>
              </AnimatedDetails>
              <AnimatedDetails title="02. ¿Qué conlleva el programa?" className='hidden md:flex flex-col'>
                <p className="mt-2 text-lg text-black">
                  • Guía de alimentos
                </p>
                <br />
                <p className="mt-2 text-lg text-black">
                  • Seguimiento con la dieta diaria por WSP
                </p>
                <br />
                <p className="mt-2 text-lg text-black">
                  • Rutina de entrenamiento orientado al objetivo buscado
                </p>
                <br />
                <p className="mt-2 text-lg text-black">
                  • Respuesta a cualquier duda sobre comidas o entrenamiento por chat
                </p>
              </AnimatedDetails>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <section className="hidden md:flex md:flex-col p-6 md:p-12 bg-[#EFECE8] mt-10 pb-20">
        <h2 className="text-3xl md:text-5xl font-black text-center my-12 text-black">NUESTROS PLANES</h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-around gap-6 gap-y-20 mt-20 w-full mb-20">

          <div className="flex-1 flex flex-col items-center group cursor-pointer relative h-[400px] max-h-[400px] w-full max-w-[400px]">
            <img
              src="./hipertrofia5.webp"
              alt="Hipertrofia"
              loading='lazy'
              decoding='async'
              className="object-cover h-full w-full absolute top-0 left-0 md:transition-opacity md:duration-500 ease-in-out group-hover:opacity-0"
            />
            <div className="flex absolute top-0 left-0 h-full w-full items-center justify-center px-4 text-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-gray-300">
              <p className="text-lg md:text-lg font-medium">
                Ganancia de masa muscular real, sin vueltas. Plan diseñado para quienes quieren aumentar volumen de forma progresiva, con entrenamientos estructurados y una guía de alimentos ajustada a tu cuerpo y ritmo de vida.
              </p>
            </div>
            <p className="mt-[420px] text-2xl font-bold text-black">HIPERTROFIA</p>
          </div>

          <div className="flex-1 flex flex-col items-center group cursor-pointer relative h-[400px] max-h-[400px] w-full max-w-[380px] ">
            <img
              src="./modelo6.jpg"
              alt="Modelo"
              loading='lazy'
              decoding='async'
              className="object-cover h-[400px] w-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            />
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center px-4 text-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-gray-300 ">
              <p className="text-lg md:text-lg font-medium">
                Ideal si querés lucir marcado, con buena simetría y ese look de portada. Enfocado en recomposición corporal, detalle muscular y rendimiento visual sin perder funcionalidad.
              </p>
            </div>
            <p className="mt-[420px] text-2xl font-bold text-black">MODELO FITNESS</p>
          </div>

          <div className="flex-1 flex flex-col items-center group cursor-pointer relative h-[400px] max-h-[400px] w-full max-w-[400px] bg-gray-300">
            <img
              src="./flaco5.png"
              alt="Flaco"
              loading='lazy'
              decoding='async'
              className="object-cover h-[400px] w-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            />
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center px-4 text-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-gray-300 ">
              <p className="text-lg md:text-lg font-medium">
                Bajá de peso sin rebotar, y sentite bien de verdad. Para quienes quieren recortar grasa, mejorar salud y verse más livianos. Plan accesible, sostenible y adaptado a tu nivel actual. Nada de dietas extremas.
              </p>
            </div>
            <p className="mt-[420px] text-2xl font-bold text-black uppercase">Recomposición muscular</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:hidden p-6 md:p-12 bg-[#EFECE8] mt-10 pb-20">
        <h2 className="text-3xl md:text-5xl font-black text-center my-12 text-black">NUESTROS PLANES</h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-around gap-6 gap-y-10 mt-20 w-full mb-20">
          <div className="flex-1 flex flex-col items-center group cursor-pointer relative h-[400px] max-h-[400px] w-full max-w-[400px]">
            <img
              src="./hipertrofia5.webp"
              alt="Hipertrofia"
              loading='lazy'
              decoding='async'
              className="object-cover h-full w-full"
            />
            <p className="text-2xl font-bold text-black pt-5">HIPERTROFIA</p>
          </div>
          <div className="text-xl mt-24 md:mt-16 md:text-lg font-medium text-center w-full max-w-[400px]">
            Ganancia de masa muscular real, sin vueltas. Plan diseñado para quienes quieren aumentar volumen de forma progresiva, con entrenamientos estructurados y una guía de alimentos ajustada a tu cuerpo y ritmo de vida.
          </div>

          <div className="flex-1 flex flex-col items-center group cursor-pointer h-[400px] max-h-[400px] w-full max-w-[380px]">
            <img
              src="./modelo6.jpg"
              alt="Modelo"
              loading='lazy'
              decoding='async'
              className="object-cover h-full w-full"
            />
            <p className="text-2xl font-bold text-black pt-5">MODELO FITNESS</p>
          </div>
          <div className="text-xl mt-24 md:mt-6 md:text-lg font-medium text-center w-full max-w-[400px]">
            Ideal si querés lucir marcado, con buena simetría y ese look de portada. Enfocado en recomposición corporal, detalle muscular y rendimiento visual sin perder funcionalidad.
          </div>

          <div className="flex-1 flex flex-col items-center group cursor-pointer relative h-[400px] max-h-[400px] w-full max-w-[400px]">
            <img
              src="./flaco5.png"
              alt="Flaco"
              loading='lazy'
              decoding='async'
              className="object-cover h-full w-full"
            />
            <p className="text-2xl font-bold text-black pt-5 uppercase">Recomposición muscular</p>
          </div>
          <div className="text-xl mt-24 md:mt-16 md:text-lg font-medium text-center w-full max-w-[400px]">
            Bajá de peso sin rebotar, y sentite bien de verdad. Para quienes quieren recortar grasa, mejorar salud y verse más livianos. Plan accesible, sostenible y adaptado a tu nivel actual. Nada de dietas extremas.
          </div>
        </div>
      </section>

      <div className='flex justify-center pb-20 bg-[#EFECE8]'>
        <a href="https://api.whatsapp.com/send?phone=+51906151954&text=%C2%A1Hola!%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20los%20planes%20de%20entrenamiento."
          className='flex justify-center cursor-pointer' target="_blank" rel="noreferrer">
          <div className="mt-6 bg-[#DA121A] px-6 py-3 rounded-md font-bold font-teko text-xl hover:bg-[#DA121A]">CONTACTANOS AHORA</div>
        </a>
      </div>

      <footer className="bg-gradient-to-r text-white text-sm md:text-lg  bg-[#373737]">
        <div className='flex flex-col gap-y-16 md:flex-row w-screen items-center md:items-start justify-around text-lg text-white pt-12 pb-11'>
          <div className='flex flex-col sm:w-1/3'>
            <h1 className="font-black mx-auto text-[#DA121A] text-2xl xl:text-4xl font-teko leading-tight">INICIA<br />TU<br />TRANSFORMACIÓN</h1>
          </div>
          <div className="sm:w-1/3 flex flex-col">
            <div className='flex mx-auto justify-start gap-x-5 font-ScandiaRegular'>
              <img width={30} height={28} src='./envelope-at-fill.svg' alt="" loading='lazy' decoding='async' />
              <div>teampapitacontact@gmail.com</div>
            </div>
            <div className='flex text-center justify-center gap-x-5 mt-6 font-ScandiaRegular'>
              <img width={28.5} height={28.5} src='./telephone.svg' alt="" loading='lazy' decoding='async' />
              <div>(+51) 906151954</div>
            </div>
          </div>
          <div className='sm:w-1/3 flex flex-col text-center'>
            <div className='font-ScandiaRegular'>Síguenos y contáctanos en</div>
            <div className='flex gap-x-6 mt-5 mx-auto'>
              <a href="https://www.tiktok.com/@Papitatok" target="_blank" rel="noreferrer"><img width={37} height={42} src='./tiktok.svg' alt="" loading='lazy' decoding='async' /></a>
              <a href="https://www.facebook.com/MarianoDOTA2" target="_blank" rel="noreferrer"><img width={42} height={42} src='./facebook.svg' alt="" loading='lazy' decoding='async' /></a>
              <a href="https://www.instagram.com/mariano.caneda" target="_blank" rel="noreferrer"><img width={42} height={42} src='./instagram.svg' alt="" loading='lazy' decoding='async' /></a>
              <a href="https://kick.com/papita" target="_blank" rel="noreferrer"><img width={42} height={42} src='./kick-logo.svg' alt="" loading='lazy' decoding='async' className="invert brightness-0" /></a>
            </div>
          </div>
        </div>
        <p className="text-center mt-5 text-white pb-5">Copyright 2025, All Right Reserved</p>
      </footer>
    </main>
  );
}