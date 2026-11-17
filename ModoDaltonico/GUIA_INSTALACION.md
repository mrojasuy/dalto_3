# Modo Daltonico - Guia de Instalacion y Uso

## Instalacion

1. Copiar la carpeta `ModoDaltonico/` dentro de `mantisbt/plugins/`.
2. Acceder a MantisBT como administrador.
3. Ir a **Administracion > Complementos** (Manage > Plugins).
4. Buscar "Modo Daltonico" en la lista de plugins disponibles.
5. Hacer clic en **Instalar** (Install).

## Configuracion

1. Una vez instalado, ir a **Administracion > Complementos**.
2. En la lista de plugins instalados, hacer clic en el nombre **Modo Daltonico**.
3. En la pagina de configuracion se puede:
   - **Activar/Desactivar** el plugin globalmente.
   - Seleccionar el **tipo de contraste** por defecto: Protanopia, Deuteranopia o Tritanopia.
4. Hacer clic en **Guardar** para aplicar los cambios.

## Uso del boton flotante

- Al navegar por MantisBT, aparece un boton flotante circular en la esquina inferior derecha.
- Hacer clic en el boton para **activar/desactivar** el modo daltonico.
- Cuando esta activo:
  - El boton se resalta en azul.
  - Aparece una etiqueta indicadora de "Activo".
  - Se muestra un selector desplegable para cambiar el tipo de daltonismo.
- La configuracion visual se guarda en el navegador (localStorage) y persiste entre pestanas y sesiones.

## Tipos de daltonismo soportados

| Tipo          | Descripcion                  |
|---------------|------------------------------|
| Protanopia    | No percibe el color rojo     |
| Deuteranopia  | No percibe el color verde    |
| Tritanopia    | No percibe el color azul     |

## Compatibilidad

- **MantisBT**: version 2.0 o superior.
- **Navegadores**: Google Chrome, Safari, Microsoft Edge (versiones recientes).

---

# Colorblind Mode - Installation and Usage Guide

## Installation

1. Copy the `ModoDaltonico/` folder into `mantisbt/plugins/`.
2. Log in to MantisBT as an administrator.
3. Go to **Manage > Plugins**.
4. Find "Colorblind Mode" in the list of available plugins.
5. Click **Install**.

## Configuration

1. Once installed, go to **Manage > Plugins**.
2. In the installed plugins list, click the name **Colorblind Mode**.
3. On the configuration page you can:
   - **Enable/Disable** the plugin globally.
   - Select the default **contrast type**: Protanopia, Deuteranopia, or Tritanopia.
4. Click **Save** to apply changes.

## Using the floating button

- While browsing MantisBT, a circular floating button appears at the bottom-right corner.
- Click the button to **enable/disable** colorblind mode.
- When active:
  - The button is highlighted in blue.
  - An "Active" indicator badge appears.
  - A dropdown selector is shown to switch the colorblindness type.
- The visual configuration is saved in the browser (localStorage) and persists across tabs and sessions.

## Supported colorblindness types

| Type          | Description                     |
|---------------|---------------------------------|
| Protanopia    | Cannot perceive red color       |
| Deuteranopia  | Cannot perceive green color     |
| Tritanopia    | Cannot perceive blue color      |

## Compatibility

- **MantisBT**: version 2.0 or higher.
- **Browsers**: Google Chrome, Safari, Microsoft Edge (recent versions).
