import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      isStorybook: process.env.IS_STORYBOOK === "true", // Assurez-vous que la variable d'environnement est une chaîne
    },
  };
};
