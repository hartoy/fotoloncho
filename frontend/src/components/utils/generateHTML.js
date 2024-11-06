import { inchesToCentimeters } from './inchesToCentimeters'

export const generateHTML = (formValues, templateData) => {
  const {
    title,
    aka,
    actor,
    signature,
    year,
    rerelease,
    color,
    weight,
    movieType,
    width,
    height,
    agency,
    origin,
    description,
    sku,
    skuLetter,
    cost,
  } = formValues

  let tableRows = `
    <tr>
      <td style="border: 3px solid black;" width="226">Title:</td>
      <td style="border: 3px solid black;" colspan="3">${title}</td>
    </tr>
  `

  if (aka) {
    tableRows += `
      <tr>
        <td style="border: 3px solid black;">A.K.A.:</td>
        <td style="border: 3px solid black;" colspan="3">${aka}</td>
      </tr>
    `
  }

  if (actor) {
    tableRows += `
      <tr>
        <td style="border: 3px solid black;">Actors:</td>
        <td style="border: 3px solid black;" colspan="3">${actor}</td>
      </tr>
    `
  }

  if (signature) {
    tableRows += `
      <tr>
        <td style="border: 3px solid black;">Signature:</td>
        <td style="border: 3px solid black;" colspan="3">${signature}</td>
      </tr>
    `
  }

  if (year || rerelease) {
    tableRows += `
      <tr>
        <td style="border: 3px solid black;">Year:</td>
        <td style="border: 3px solid black;"width="180">${year || ''}</td>
        <td style="border: 3px solid black;" width="190">Re-Release:</td>
        <td style="border: 3px solid black;" width="189">${rerelease || ''}</td>
      </tr>
    `
  }

  if (color) {
    tableRows += `
      <tr>
        <td style="border: 3px solid black;">Color:</td>
        <td style="border: 3px solid black;" colspan="3">${color}</td>
      </tr>
    `
  }

  if (weight || movieType) {
    tableRows += `
      <tr>
        <td style="border: 3px solid black;">Weight:</td>
        <td style="border: 3px solid black;">${weight || ''}</td>
        <td style="border: 3px solid black;">Movie Type:</td>
        <td style="border: 3px solid black;">${movieType || ''}</td>
      </tr>
    `
  }

  if (width || height) {
    const widthCm = inchesToCentimeters(width)
    const heightCm = inchesToCentimeters(height)

    tableRows += `
      <tr>
        <td style="border: 3px solid black;">Size:</td>
        <td style="border: 3px solid black;" colspan="3">Inches: ${width} x ${height}  - Centimeters: ${widthCm} x ${heightCm} Approx.</td>
      </tr>
    `
  }

  if (agency) {
    tableRows += `
      <tr>
        <td style="border: 3px solid black;">Photographer / Agency:</td>
        <td style="border: 3px solid black;" colspan="3">${agency}</td>
      </tr>
    `
  }

  if (origin) {
    tableRows += `
      <tr>
        <td style="border: 3px solid black;">Origin:</td>
        <td style="border: 3px solid black;" colspan="3">${origin}</td>
      </tr>
    `
  }

  if (description) {
    const formattedDescription = description.replace(/\n/g, '<br>')
    tableRows += `
      <tr>
        <td style="border: 3px solid black;">Description and Condition:</td>
        <td style="border: 3px solid black;" colspan="3">${formattedDescription}</td>
      </tr>
    `
  }

  tableRows += `
    <tr>
      <td style="border: 3px solid black;">SKU:</td>
      <td style="border: 3px solid black;">${sku}${skuLetter ? '-' + skuLetter : ''}</td>
      <td style="border: 3px solid black;"><font color="#C0C0C0">Costo:</font></td>
      <td style="border: 3px solid black;"><font color="#C0C0C0">${cost || ''}</font></td>
    </tr>
  `

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tabla de Datos</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
        }
        table {
          color: rgb(0, 0, 0);
          font-size: 1em !important;
          border: 2px solid black !important;
          border-spacing: 0px !important;
          text-align: center !important;
          width: 100%;
          max-width: 825px;
          margin: auto;
          border-collapse: collapse;
        }
        td {
          padding: 10px !important;
          font-weight: bold !important;
          text-align: left !important;
        }
        h1 {
          font-size: 2em;
          color: #006400;
          margin-top: 10px;
          font-family: Tahoma, sans-serif;
        }  
        h2 {
          margin: 10px 0;
          font-size: 1.6em;
          color: #008000;
          font-weight: bold;
          text-align: center;
          font-family: Tahoma, sans-serif;
        }
        .red-title-div h2 {
          color: red;
          font-weight: bold;
          text-align: center;
        }
        ul {
          padding-left: 20px;
          margin: 0;
        }

        li{
        font-size: 1.2em;
        }
        @media (max-width: 600px) {
          h2 {
            font-size: 1.5em;
          }
          table {
            font-size: 16px;
          }
          td {
            padding: 8px;
          }
        }
      </style>
    </head>
    <body>
      <div align="center">
       <div id="container" style="margin-top: 55px; width: 90%; margin: auto;">
       <div style="margin: auto; display: flex; justify-content: center;">
        <table style="margin-top: 40px" cellpadding="2">
          ${tableRows}
        </table>
         </div> 
       </div> 
        <div id="container" style=" width: 90%; margin: auto;">
          <h1 style="margin-top: 40px;">THIS ITEM IS SELL AS IS</h1>

          <div style="max-width: 825px; text-align: center; padding: 15px 0;">
             <h2 style="color: #0000FF; font-weight: bold;">
              <span style="text-transform: uppercase;">
                <span style="color: #0000FF">&gt;</span> 
                <a href="${templateData.first_title_url}"   target="_blank" style="color: #0000FF;">
                  ${templateData.first_title || 'See the other ADS I have'}
                </a>
                <span style="color: #0000FF">&lt;</span> 
               </span>
             </h2>
          </div>

          ${templateData.red_title ? `<div class="red-title-div"><h2>${templateData.red_title}</h2></div>` : ''}

          
          <div style="max-width: 825px; margin: 20px 0;">
            <table border="1" cellspacing="0" cellpadding="10" width="100%" style="border: 2px solid black; border-radius: 10px; border-collapse: separate;">
              <tr>
                <td style="border-top: 2px solid black; padding: 20px;">
                  <ul>
                    ${
                      templateData.first_block.text
                        ?.filter((item) => item.trim() !== '')
                        .map((item) => `<li style="margin: 15px 0;">${item}</li>`)
                        .join('') || ''
                    }
                  </ul>
                </td>
              </tr>
            </table>
          </div>

          
          ${
            templateData.condition_block &&
            templateData.condition_block.title &&
            templateData.condition_block.text?.length > 0
              ? `
            <div style="max-width: 825px; margin: 20px 0;">
              <table border="1" cellspacing="0" cellpadding="10" width="100%" style="border: 2px solid black; border-radius: 10px; border-collapse: separate;">
                <tr>
                  <td style="border: 2px solid black; text-align: center; color: blue; font-size: 1.2em; font-weight: bold; padding: 20px; background-color: #d3d3d3; display: flex; justify-content: center; font-family: Tahoma, sans-serif;">
                    ${templateData.condition_block.title}
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 2px solid black; padding: 20px;">
                    <ul>
                      ${
                        templateData.condition_block.text
                          .filter((info) => info.trim() !== '')
                          .map((info) => `<li style="margin: 15px 0;">${info}</li>`)
                          .join('') || ''
                      }
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
          `
              : ''
          }

          
          ${
            templateData.payment_block &&
            templateData.payment_block.title &&
            templateData.payment_block.text?.length > 0
              ? `
            <div style="max-width: 825px; margin: 20px 0;">
              <table border="1" cellspacing="0" cellpadding="10" width="100%" style="border: 2px solid black; border-radius: 10px; border-collapse: separate;">
                <tr>
                  <td style="border: 2px solid black; text-align: center; color: blue; font-size: 1.2em; font-weight: bold; padding: 20px; background-color: #d3d3d3; display: flex; justify-content: center; font-family: Tahoma, sans-serif;">
                    ${templateData.payment_block.title}
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 2px solid black; padding: 20px;">
                    <ul>
                      ${
                        templateData.payment_block.text
                          .filter((method) => method.trim() !== '')
                          .map((method) => `<li style="margin: 15px 0;">${method}</li>`)
                          .join('') || ''
                      }
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
          `
              : ''
          }

          
          ${
            templateData.ship_info && templateData.ship_info.title && templateData.ship_info.text?.length > 0
              ? `
            <div style="max-width: 825px; margin: 20px 0;">
              <table border="1" cellspacing="0" cellpadding="10" width="100%" style="border: 2px solid black; border-radius: 10px; border-collapse: separate;">
                <tr>
                  <td style="border: 2px solid black; text-align: center; color: blue; font-size: 1.2em; font-weight: bold; padding: 20px; background-color: #d3d3d3; display: flex; justify-content: center; font-family: Tahoma, sans-serif;">
                    ${templateData.ship_info.title}
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 2px solid black; padding: 20px;">
                    <ul>
                      ${
                        templateData.ship_info.text
                          .filter((info) => info.trim() !== '')
                          .map((info) => `<li style="margin: 15px 0;">${info}</li>`)
                          .join('') || ''
                      }
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
          `
              : ''
          }

          <div style="max-width: 825px; text-align: center; padding: 15px 0;">
            <h2 style="color: #0000FF; font-weight: bold;">
               <span style="color: #0000FF">&gt;</span>
                <a href="https://www.ebay.com/str/Fotoloncho" target="_blank" style="color: #0000FF; text-transform: uppercase;">
                  Don't forget to visit my whole store 
                </a>
               <span style="color: #0000FF">&lt;</span> 
            </h2>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  return htmlContent
}
