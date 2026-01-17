// import HeroLayout from "@/common/layout/hero-layout/HeroLayout";
// import { founders } from "../data/team";
// export default function FoundersHero() {
//   return (
//     <HeroLayout>
//       {/* Background */}

//       <div className="relative containerr py-section-y">
//         <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
//           {/* Text */}
//           <div>
//             <h1 className="text-4xl font-bold leading-tight text-secondary md:text-5xl">
//               Built by doctors who believe
//               <span className="text-primary"> patients deserve clarity</span>
//             </h1>

//             <p className="mt-6 max-w-xl text-lg text-text-muted">
//               WiseFollowUp was created by medical graduates who experienced
//               firsthand how unclear patient information can affect safety,
//               confidence, and outcomes.
//             </p>
//           </div>

//           {/* Founders Images */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {founders.map((founder) => (
//               <div
//                 key={founder.name}
//                 className="rounded-card bg-bg-surface p-4 shadow-soft"
//               >
//                 <img
//                   src={founder.image}
//                   alt={founder.name}
//                   className="h-[450px] lg:h-[550px] w-full rounded-card object-cover"
//                 />
//                 <h3 className="mt-4 font-medium text-secondary">
//                   {founder.name}
//                 </h3>
//                 <p className="text-sm text-text-muted">{founder.role}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </HeroLayout>
//   );
// }
import HeroLayout from "@/common/layout/hero-layout/HeroLayout";
import { founders } from "../data/team";

export default function FoundersHero() {
  const [leftFounder, rightFounder] = founders;

  return (
    <HeroLayout minHeight="min-h-[80vh]">
      <div className="relative containerr pt-section-y pb-40">
        {/* Center story */}
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary leading-tight">
            Our story
          </h1>

          <p className="mt-6 text-base md:text-lg text-text-muted leading-relaxed">
            WiseFollowUp was created by medical graduates who experienced
            firsthand how unclear patient information can affect safety,
            confidence, and outcomes.
          </p>

          <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed">
            We believe patients deserve clarity — before, during, and after
            every clinical interaction.
          </p>
        </div>

        {/* Founders images */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 top-0
            hidden lg:flex
            justify-between
            items-end
          "
        >
          {/* Left founder */}
          <FounderImage image={leftFounder.image} align="left" />

          {/* Right founder */}
          <FounderImage image={rightFounder.image} align="right" />
        </div>

        {/* Mobile fallback */}
        <div className="mt-16 grid gap-8 lg:hidden">
          {[leftFounder, rightFounder].map((f) => (
            <img
              key={f.image}
              src={f.image}
              alt=""
              loading="lazy"
              className="
                w-full max-w-sm mx-auto
                rounded-card
                shadow-soft
                object-cover
              "
            />
          ))}
        </div>
      </div>
    </HeroLayout>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Helper Image                                  */
/* -------------------------------------------------------------------------- */

function FounderImage({
  image,
  align,
}: {
  image: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={`
        relative
        w-[280px] xl:w-[340px]
        ${align === "left" ? "ml-6 xl:ml-12" : "mr-6 xl:mr-12"}
      `}
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="
          w-full
          h-[520px] xl:h-[620px]
          object-cover
          rounded-t-[2rem]
          shadow-soft
        "
      />
    </div>
  );
}
