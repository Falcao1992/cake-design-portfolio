// Importation des modules Prisma et Faker
import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

// Instanciation du client Prisma
const prisma = new PrismaClient();

// Fonction principale asynchrone
const main = async () => {
  // Déclaration du nombre d'utilisateurs et de gâteaux fictifs à générer
  const nbUser = 10;
  const nbCake = 50;

  // Tableaux pour stocker les données fictives
  const users: Prisma.UserCreateInput[] = [];
  const cakes: Prisma.CakeUncheckedCreateInput[] = [];
  const tags: Prisma.TagCreateInput[] = [];

  // Génération d'utilisateurs fictifs
  for (let i = 0; i < nbUser; i++) {
    // Création d'un utilisateur avec des données fictives
    const user: Prisma.UserCreateInput = {
      username: faker.internet.userName(),
      image: faker.image.avatar(),
      name: faker.person.firstName(),
      bio: faker.lorem.paragraph(),
      link: faker.internet.url(),
      email: faker.internet.email(),
    };

    // Création de l'utilisateur dans la base de données
    const dbUser = await prisma.user.create({ data: user });

    // Ajout de l'utilisateur à la liste des utilisateurs générés
    users.push(dbUser);
  }

  // Génération de gâteaux fictifs
  for (let i = 0; i < nbCake; i++) {
    // Index d'utilisateur aléatoire pour associer le gâteau à un utilisateur existant
    const randomUserIndex = faker.number.int({
      min: 0,
      max: users.length - 1,
    });

    // Nombre aléatoire de mots pour la description du gâteau
    const randomWordCount = faker.number.int({
      min: 5,
      max: 12,
    });

    // Création d'un gâteau avec des données fictives
    const cake: Prisma.CakeUncheckedCreateInput = {
      title: faker.lorem.sentence(2),
      description: faker.lorem.sentence(randomWordCount),
      imageUrl: faker.image.urlLoremFlickr({ category: "food" }),
      userId: users?.[randomUserIndex].id || "999",
    };

    // Création du gâteau dans la base de données
    const dbCake = await prisma.cake.create({ data: cake });

    // Ajout du gâteau à la liste des gâteaux générés
    cakes.push(dbCake);
  }

  // Création de tags spécifiques
  const tagChocolate: Prisma.TagCreateInput = {
    name: "Chocolate",
    description: "Cakes with chocolate flavor",
  };
  const tagVanilla: Prisma.TagCreateInput = {
    name: "Vanilla",
    description: "Cakes with vanilla flavor",
  };

  // Création des tags dans la base de données
  const dbTagChocolate = await prisma.tag.create({ data: tagChocolate });
  const dbTagVanilla = await prisma.tag.create({ data: tagVanilla });

  // Ajout des tags à la liste des tags générés
  tags.push(dbTagChocolate, dbTagVanilla);

  // Association aléatoire de tags à des gâteaux
  for (let i = 0; i < 10; i++) {
    // Index aléatoire pour les tags et les gâteaux
    const randomTagsIndex = faker.number.int({
      min: 0,
      max: tags.length - 1,
    });
    const randomCakeIndex = faker.number.int({
      min: 0,
      max: cakes.length - 1,
    });

    // Vérification de la présence des IDs avant de créer l'association
    if (cakes[randomCakeIndex].id && tags[randomTagsIndex].id) {
      const cakeTag: Prisma.CakeTagUncheckedCreateInput = {
        cakeId: cakes[randomCakeIndex].id || "999",
        tagId: tags[randomTagsIndex].id || "999",
      };

      // Création de l'association dans la base de données
      await prisma.cakeTag.create({ data: cakeTag });
    }
  }
};

// Exécution de la fonction principale
main()
  .then(async () => {
    // Déconnexion du client Prisma en cas de succès
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // Gestion des erreurs : affichage de l'erreur, déconnexion du client Prisma, et sortie du processus avec code d'erreur
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
