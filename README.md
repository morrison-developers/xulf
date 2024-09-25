# Xulf

This guide provides detailed steps for working with the Nx monorepo, including generating components, libraries, and projects, as well as testing and troubleshooting common issues.

## 1. Generating a New Shared Component

To generate a new component, use the following command:

```bash
nx g @nrwl/react:component <component-name> --directory=libs/shared-ui/src/lib/<component-name>
```

For example, to generate a `test` component in the `libs/shared-ui/src/lib/test` directory, run:

```bash
nx g @nrwl/react:component test --directory=libs/shared-ui/src/lib/test
```

### Troubleshooting:
If you encounter errors such as "Failed to process project graph," try resetting the Nx cache:

```bash
nx reset
```

## 2. Creating a New Library in `libs/`

To create a new library inside the `libs/` directory, use the following command:

```bash
nx g @nrwl/react:library <library-name> --directory=libs
```

For example, to create a library called `shared-ui`:

```bash
nx g @nrwl/react:library shared-ui --directory=libs
```

This will generate the library inside `libs/shared-ui`.

## 3. Creating a New Project in `apps/`

To create a new project inside the `apps/` directory, use the following command:

```bash
nx g @nrwl/react:app <app-name>
```

For example, to create a new project called `resturant-app`:

```bash
nx g @nrwl/react:app resturant-app
```

This will generate the project in the `apps/resturant-app` directory.

## 4. Testing Affected Projects

Nx allows you to test only the affected projects after making changes. To test all affected projects, run:

```bash
nx affected --target=test
```

You can also build affected projects with:

```bash
nx affected --target=build
```

## 5. Installing Nx CLI Extension for VSCode

You can install the **Nx Console** extension in Visual Studio Code for a better developer experience. This extension allows you to generate components, libraries, and projects directly from the VSCode interface.

### Steps to Install Nx Console:
1. Open **Visual Studio Code**.
2. Go to the **Extensions** tab (or press `Ctrl+Shift+X`).
3. Search for **Nx Console**.
4. Click **Install**.

### How to Use Nx Console:
1. Open the Nx Console by pressing `Ctrl+Shift+P` and typing `Nx:`.
2. Select the desired action (generate a component, run affected tests, etc.) from the menu.
3. Follow the prompts in the UI to run the commands.

## 6. Additional Information

- **Nx DevTools**: Nx provides a set of tools to visualize project dependencies and explore the structure of your monorepo. You can run the following command to open a graphical view of your project dependencies:

  ```bash
  nx graph
  ```

- **Project Reset**: If you encounter project graph issues or errors, you can always run:

  ```bash
  nx reset
  ```

  This will clear the project graph cache and often resolve issues.

- **Efficient Testing**: Nx automatically runs tasks in parallel to optimize your workflow. You can customize these settings in the `nx.json` file.

For more details, check the official Nx documentation: [Nx Documentation](https://nx.dev/)

