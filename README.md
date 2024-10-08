<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# TESLO API

1. Clonar rpyecto

2. Instalar dependencias

```
yarn install
```

3. Clonar el archivo `.env.template` y renombrarlo a `.env`

4. Cambiar las variables de entorno

5. Levantar la base de datos

```
docker-compose up -d
```

6. Ejecutar SEED

```
localhost:3000/api/seed
```

7. Levantar proyecto

```
yarn start:dev
```

# Extras

## Git Commit Automation

This project includes a custom npm script for automating Git commits with a dynamic message. You can use this script to commit changes with a custom message using npm commands.

### How to Use

1. **Commit Changes**

   To commit your changes using the npm script, run the following command:

   ```bash
   npm run commit --message="Your commit message"
   ```

   - Replace `"Your commit message"` with the actual message you want to use for your Git commit.
   - This command will automatically:
     - Stage all changes (`git add .`)
     - Commit the changes with the message you provide
     - Push the changes to the remote repository

### Example

```bash
npm run commit --message="Fixed a bug in the authentication module"
```

In this example, the changes are staged, committed with the message "Fixed a bug in the authentication module", and then pushed to the remote repository.

### Additional Information

- The commit script relies on the `npm_config_message` environment variable, which you can pass dynamically using `--message="Your commit message"` as part of the `npm run` command.
- This setup allows you to handle Git commits in a more streamlined and consistent way across different environments.
