/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "demo-remix-spa",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc");

    const fileSystem = new sst.aws.Efs("NotesApiFileSystem", { vpc });

    const api = new sst.aws.Function("NotesApi", {
      url: true,
      handler: "./apps/notes-api/src/lambda.handler",
      runtime: "nodejs20.x",
      dev: false,
      environment: {
        NOTES_DB: "/mnt/efs/db.json",
        NOTES_API_ALLOW_ORIGIN: "*",
      },
      volume: {
        efs: fileSystem,
        path: "/mnt/efs",
      },
      vpc: {
        privateSubnets: vpc.privateSubnets,
        securityGroups: vpc.securityGroups,
      },
    });

    const spa = new sst.aws.StaticSite("NotesSpa", {
      environment: {
        VITE_NOTES_API_URL: api.url,
      },
      build: {
        command: "pnpm run build-spa",
        output: "./apps/notes-spa/build/client",
      },
    });

    return {
      api: api.url,
      spa: spa.url,
    };
  },
});
