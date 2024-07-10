# Lab DevOps - GitHub CICD #1

## TP - Intégration continue

> [!WARNING]
> Prérequis :
>
> - Avoir un compte [GitHub](https://github.com/) et forker ce repository
> - Être familier avec [TypeScript](https://www.typescriptlang.org/) et [YAML](https://yaml.org/)

### Présentation du TP

Ce TP est une initiation à la création et configuration de pipelines GitHub dans le cadre de la chaîne d'intégration continue (Continuous Integration Continuous Delivery).

> L'intégration continue (de l'anglais : Continuous integration, CI), est un ensemble de pratiques utilisées en génie logiciel consistant à vérifier à chaque modification de code source que le résultat des modifications ne produit pas de régression dans l'application développée.
>
> L'intégration continue repose souvent sur la mise en place d'une brique logicielle permettant l'automatisation de tâches : compilation, tests unitaires et fonctionnels, validation produit, tests de performances… À chaque changement du code, cette brique logicielle va exécuter un ensemble de tâches et produire un ensemble de résultats, que le développeur peut par la suite consulter. Cette intégration permet ainsi de ne pas oublier d'éléments lors de la mise en production et donc ainsi améliorer la qualité du produit.
>
> -- <cite>[Wikipedia : Intégration continue](https://fr.wikipedia.org/wiki/Int%C3%A9gration_continue)</cite>
>
> GitHub Actions est une plateforme d’intégration continue et livraison continue (CI/CD) qui vous permet d’automatiser votre pipeline de génération, de test et de déploiement. Vous pouvez créer des workflows qui créent et testent chaque demande de tirage (pull request) adressée à votre dépôt, ou déployer des demandes de tirage fusionnées en production.
>
> -- <cite>[Documentation GitHub : Comprendre GitHub Actions](https://docs.github.com/fr/actions/learn-github-actions/understanding-github-actions#vue-densemble)</cite>
>
> Un workflow est un processus automatisé configurable qui exécutera un ou plusieurs travaux. Les workflows sont définis par un fichier YAML archivé dans votre dépôt et s’exécutent lorsqu’ils sont déclenchés par un événement dans votre dépôt, ou ils peuvent être déclenchés manuellement ou selon une planification définie.
>
> Les workflows sont définis dans le répertoire `.github/workflows` d’un référentiel, et un référentiel peut avoir plusieurs workflows, chacun pouvant effectuer un ensemble différent de tâches. Par exemple, vous pouvez avoir un workflow pour générer et tester des demandes de tirage, un autre workflow pour déployer votre application chaque fois qu’une version est créée, et encore un autre workflow qui ajoute une étiquette chaque fois que quelqu’un ouvre un nouveau problème.
>
> -- <cite>[Documentation GitHub : À propos des workflows](https://docs.github.com/fr/actions/using-workflows/about-workflows#about-workflows)</cite>

> [!NOTE]
> Quelques liens utiles pour GitHub Actions :
>
> - [Documentation GitHub : Utilisation de flux de travail](https://docs.github.com/en/actions/using-workflows)
> - [Documentation GitHub : Création et test de code Node.js](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
> - [GitHub Marketplace : Actions](https://github.com/marketplace?type=actions)
> - [Visual Studio Marketplace : GitHub Actions](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions)

### Présentation de l'application

- Cette application Node TypeScript est une API web permettant de réaliser des opérations mathématiques standards (addition, soustraction, multiplication, division).
  - [`src/index.ts`](src/index.ts), point d'entrée de l'application et démarre le serveur web
  - [`src/util/compute.util.ts`](src/util/compute.util.ts), implémentation des opérations mathématiques
  - [`test/util/compute.util.test.ts`](test/util/compute.util.test.ts), tests unitaires
  - [`.github/workflows/my-workflow.yml`](.github/workflows/my-workflow.yml), workflow GitHub primitif déclenchable manuellement depuis le repository

> [!IMPORTANT]
>
> - Un simple éditeur de texte suffit puisque il n'est pas demandé d'exécuter l'application en local.
> - Il est possible de travailler directement sur la branche par défaut (`main`).
> - La visibilité du repository doit être **public** afin de pouvoir aller jusqu'au bout du TP.

### 1. Exécution manuelle d'un workflow GitHub

- Exécuter manuellement le workflow existant avec GitHub Actions. ([Documentation GitHub : Exécution manuelle d’un workflow](https://docs.github.com/fr/actions/using-workflows/manually-running-a-workflow)).

### 2. Build de l'application

- Mettre à jour le workflow pour lancer un build de l'application ([Documentation GitHub : Commandes de workflow](https://docs.github.com/fr/actions/using-workflows/workflow-commands-for-github-actions)).

> [!TIP]
> L'application se build via la ligne de commande `npm run build`.

<details>
<summary>Réponse</summary>
<b>my-workflow.yml</b>

```yaml
name: Manual build
on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "16"

      - name: Install dependencies
        run: npm install

      - name: Build application
        run: npm run build
```

</details>

- Le build de l'application est en échec. Consulter les logs du workflow et corriger l'application. Vérifier que le build passe avec GitHub Actions.

<details>
<summary>Réponse</summary>
<b>index.ts</b>

```ts
...
app.get("/minus/:a/:b", (request: Request, response: Response) => {
  ...
  const b = parseInt(request.params.b);
  ...
});
...
```

</details>

### 3. Tester l'application

- Mettre à jour le workflow pour lancer les tests de l'application. Les tests sont en échec et doivent le rester pour le moment.

> [!TIP]
> L'application se teste via la ligne de commande `npm test`.

<details>
<summary>Réponse</summary>
<b>my-workflow.yml</b>

```yaml
name: Manual build & test
on:
  workflow_dispatch:

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "16"

      - name: Install dependencies
        run: npm install

      - name: Build application
        run: npm run build

      - name: Test application
        run: npm test
```

</details>

### 4. Ajout d'un paramètre optionnel

- Mettre à jour le workflow pour qu'il accepte un paramètre `Run tests?`, avec `false` en valeur par défaut, afin que les tests ne soient joués que si la valeur donnée lors de l'exécution du workflow est `true` ([Documentation GitHub : on.workflow_call.inputs](https://docs.github.com/fr/enterprise-cloud@latest/actions/using-workflows/workflow-syntax-for-github-actions#onworkflow_callinputs)). Vérifier que le comportement du workflow est différent en fonction de la valeur renseignée à l'exécution du workflow ([Documentation GitHub : Utilisations des conditions](https://docs.github.com/fr/actions/using-jobs/using-conditions-to-control-job-execution)).

<details>
<summary>Réponse</summary>
<b>my-workflow.yml</b>

```yaml
name: Manual build & test
on:
  workflow_dispatch:
    inputs:
      run-tests:
        description: "Run tests?"
        required: true
        default: "false"

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "16"

      - name: Install dependencies
        run: npm install

      - name: Build application
        run: npm run build

      - name: Test application
        if: ${{ github.event.inputs.run-tests == 'true' }}
        run: npm test
```

</details>

### 5. Déclenchement automatique sur Pull Request

- Créer une nouvelle branche Git.
- Mettre à jour le workflow pour qu'il s'exécute automatiquement lorsque le code est poussée sur une Pull Request ([Documentation GitHub : Workflow Pull Request](https://docs.github.com/fr/actions/using-workflows/events-that-trigger-workflows#pull_request)).
- Les tests doivent être joués.
- Pousser la branche et créer la Pull Request associée sans la fusionner.

<details>
<summary>Réponse</summary>
<b>my-workflow.yml</b>

```yaml
name: Manual or PR build & test
on:
  workflow_dispatch:
    inputs:
      run-tests:
        description: "Run tests?"
        required: true
        default: "false"
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "16"

      - name: Install dependencies
        run: npm install

      - name: Build application
        run: npm run build

      - name: Test application
        if: ${{ github.event.inputs.run-tests == 'true' || github.event_name == 'pull_request' }}
        run: npm test
```

</details>

### 6. Règles de protection de branche

- La Pull Request précédemment créée peut tout de même être fusionnée alors que les tests unitaires de l'application ne sont pas tous en succès. Mettre en place une sécurité sur la branche pour empêcher cela et bloquer tout push sur la branche de travail. ([Documentation GitHub : Création d'une règle de protection de branche - vérifications d'état #7](https://docs.github.com/fr/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule#creating-a-branch-protection-rule)).
- Vérifier que la Pull Request ne peut être fusionnée et qu'il n'est pas possible de pousser directement sur la branche de travail.

> [!TIP]
> La vérification d'état s'attend à un job et non pas à un workflow. Dans l'exemple des corrections fournies plus haut, il s'agit de `build-and-test`.

<details>
<summary>Réponse</summary>

- Aller dans **Settings > Branches**.
- Cliquer sur **Add classic branch protection rule**.
- Saisir le nom de votre branche sur laquelle les Pull Requests seront fusionnées.
- Cocher **Require a pull request before merging**.
- Cocher **Require status checks to pass before merging**.
  - Chercher le nom du job et l'ajouter.
- Cliquer sur le bouton **Create** tout en bas.
</details>

### 7. Débloquer la Pull Request

- Les tests de l'application sont en échec. Consulter les logs du workflow et corriger les tests de l'application.
- Fusionner la Pull Request.

<details>
<summary>Réponse</summary>
<b>compute.util.ts</b>

```ts
static minus(a: number, b: number): number {
  return a - b;
}
```

</details>

### 8. Utiliser des services

- Créer une nouvelle branche et la Pull Request associée et y ajouter le fichier de test suivant :

[test/database.test.ts](test/database.test.ts)

```ts
import { Client } from "pg";

describe("Database", () => {
  test("connection", async () => {
    const database = new Client({
      host: "127.0.0.1",
      port: 5432,
      database: "cicd_database",
      user: "cicd_user",
      password: "cicd_password",
    });

    const connected = await database
      .connect()
      .then(() => true)
      .catch(() => false)
      .finally(async () => await database.end());
    expect(connected).toBe(true);
  });
});
```

- Ajouter un service PostgreSQL dans le workflow afin que le nouveau test testant la connexion à la base de données ne soit plus en échec ([Documentation GitHub : Création de conteneurs de service PostgreSQL](https://docs.github.com/fr/actions/using-containerized-services/creating-postgresql-service-containers)).

### 9. Second job optionel SonarCloud

- A définir : Ajouter un service BDD + secret / mettre en place le déploiement au Push / SonarCloud ? mettre en place un ajout de commentaire avec le coverage de Jest (https://github.com/marketplace/actions/jest-coverage-comment) ?

### 10. Mise en place de secrets

- Protégez vos mots de passe dans le workflow en utilsant des secrets ([Documentation GitHub : Utilisation de secrets dans GitHub Actions](https://docs.github.com/fr/actions/security-guides/using-secrets-in-github-actions)).

.  
.  
.  
.  
.  
.  
.  
**Ajouter pg au package dès le début :**  
 "express": "^4.19.2",
"pg": "^8.12.0"
},
"devDependencies": {
"@types/express": "^4.17.21",
"@types/jest": "^29.5.12",
"@types/pg": "^8.11.6",
