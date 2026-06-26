import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Check if admin org exists
  let org = await prisma.organization.findFirst({ where: { slug: "promedbooth" } });
  if (!org) {
    org = await prisma.organization.create({
      data: { name: "PROMEDBOOTH", slug: "promedbooth" },
    });
    console.log("Created organization:", org.name);
  }

  // Check if admin user exists
  let admin = await prisma.user.findUnique({ where: { email: "shusensei27@gmail.com" } });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: "shusensei27@gmail.com",
        name: "Admin Promedbooth",
        role: "ADMIN",
        organizationId: org.id,
      },
    });
    console.log("Created admin user:", admin.email);
  }

  // Check if demo templates exist
  const templateCount = await prisma.template.count({ where: { organizationId: org.id } });
  if (templateCount === 0) {
    const template = await prisma.template.create({
      data: {
        name: "Two Star 4R (Community)",
        slug: "two-star-4r-community",
        canvasWidth: 1080,
        canvasHeight: 1920,
        organizationId: org.id,
        isPublic: true,
      },
    });

    await prisma.templateLayer.createMany({
      data: [
        {
          templateId: template.id,
          type: "PHOTO_SLOT",
          zIndex: 0,
          visible: true,
          locked: false,
          fabricJson: { left: 40, top: 200, width: 460, height: 580, fill: "#DBEAFE", stroke: "#2563EB", strokeWidth: 2, rx: 12, ry: 12 },
        },
        {
          templateId: template.id,
          type: "PHOTO_SLOT",
          zIndex: 1,
          visible: true,
          locked: false,
          fabricJson: { left: 580, top: 200, width: 460, height: 580, fill: "#DBEAFE", stroke: "#2563EB", strokeWidth: 2, rx: 12, ry: 12 },
        },
      ],
    });

    await prisma.template.create({
      data: {
        name: "Elegant Gold Frame",
        slug: "elegant-gold-frame",
        canvasWidth: 1080,
        canvasHeight: 1920,
        organizationId: org.id,
        isPublic: true,
      },
    });

    await prisma.template.create({
      data: {
        name: "Polaroid Classic",
        slug: "polaroid-classic",
        canvasWidth: 1080,
        canvasHeight: 1920,
        organizationId: org.id,
        isPublic: true,
      },
    });

    console.log("Created demo templates");
  }

  // Check if org settings exist
  const settings = await prisma.organizationSettings.findUnique({ where: { organizationId: org.id } });
  if (!settings) {
    await prisma.organizationSettings.create({
      data: {
        organizationId: org.id,
        storageLimit: 2000000000,
        paymentGateway: "NONE",
      },
    });
    console.log("Created organization settings");
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
