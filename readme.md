# Megio panel

Megio panel is a JS/TS library that handles the rendering of the entire UI built on top of the Megio API. This library
provides a wide range of extensibility. It is suitable for creating the UI of your own administration.

**Docs: https://megio.dev/docs/utilities/megio-panel/installation**

## Contributing

1. Fork the repository
2. Clone your fork: `git clone <your-repository>`
3. Create your feature branch: `git checkout -b feature/your-feature`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Submit a pull request

## Dev workflow

### Development

1. Install dependencies: `yarn`
2. Start the development server: `yarn dev` or just watch `yarn watch`
3. Build the project: `yarn build`

### Testing

1. Create symlink: `yarn link`
2. Switch to the `cd ./tests` directory
3. Use the symlink: `yarn link megio-panel`
4. Change `API_ENDPOINT` in file `./assets/panel.ts` to `https://demo.megio.dev/`.
5. Start the development server: `yarn dev`
6. Build the project: `yarn build`
7. Run project: `yarn serve`