import { motion } from "framer-motion";
import kredEcosystem from "@/assets/kred-ecosystem.png";

export const EcosystemMap = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-medium">
            The Ecosystem
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold font-display mb-4">
            The Kred Puzzle
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nine interlocking products that form the complete infrastructure for the Agentic Web.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={kredEcosystem}
            alt="The Kred Ecosystem — 9 interlocking products: Domains.Kred, Link.Kred, Score.Kred, SocialOS.io, Grab.Kred, Empire.Kred, OneHub.Kred, NFT.Kred, and NFT.NYC"
            className="w-full max-w-4xl rounded-2xl"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};
