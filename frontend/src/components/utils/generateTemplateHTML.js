export const generateTemplateHTML = (formData) => {
  const templateContent = `
    <div id="container" style=" width: 90%; margin: auto;">
          <h1 style="margin-top: 40px;">THIS ITEM IS SELL AS IS</h1>

          <div style="max-width: 825px; text-align: center; padding: 15px 0;">
             <h2 style="color: #0000FF; font-weight: bold;">
              <span style="text-transform: uppercase;">
                <span style="color: #0000FF">&gt;</span> 
                <a href="${formData.first_title_url}"   target="_blank" style="color: #0000FF;">
                  ${formData.first_title || 'See the other ADS I have'}
                </a>
                <span style="color: #0000FF">&lt;</span> 
               </span>
             </h2>
          </div>

          ${formData.red_title ? `<div class="red-title-div"><h2>${formData.red_title}</h2></div>` : ''}

          
          <div style="max-width: 825px; margin: 20px 0;">
            <table border="1" cellspacing="0" cellpadding="10" width="100%" style="border: 2px solid black; border-radius: 10px; border-collapse: separate;">
              <tr>
                <td style="border-top: 2px solid black; padding: 20px;">
                  <ul>
                    ${
                      formData.first_block.text
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
            formData.condition_block && formData.condition_block.title && formData.condition_block.text?.length > 0
              ? `
            <div style="max-width: 825px; margin: 20px 0;">
              <table border="1" cellspacing="0" cellpadding="10" width="100%" style="border: 2px solid black; border-radius: 10px; border-collapse: separate;">
                <tr>
                  <td style="border: 2px solid black; text-align: center; color: blue; font-size: 1.2em; font-weight: bold; padding: 20px; background-color: #d3d3d3; display: flex; justify-content: center; font-family: Tahoma, sans-serif;">
                    ${formData.condition_block.title}
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 2px solid black; padding: 20px;">
                    <ul>
                      ${
                        formData.condition_block.text
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
            formData.payment_block && formData.payment_block.title && formData.payment_block.text?.length > 0
              ? `
            <div style="max-width: 825px; margin: 20px 0;">
              <table border="1" cellspacing="0" cellpadding="10" width="100%" style="border: 2px solid black; border-radius: 10px; border-collapse: separate;">
                <tr>
                  <td style="border: 2px solid black; text-align: center; color: blue; font-size: 1.2em; font-weight: bold; padding: 20px; background-color: #d3d3d3; display: flex; justify-content: center; font-family: Tahoma, sans-serif;">
                    ${formData.payment_block.title}
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 2px solid black; padding: 20px;">
                    <ul>
                      ${
                        formData.payment_block.text
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
            formData.ship_info && formData.ship_info.title && formData.ship_info.text?.length > 0
              ? `
            <div style="max-width: 825px; margin: 20px 0;">
              <table border="1" cellspacing="0" cellpadding="10" width="100%" style="border: 2px solid black; border-radius: 10px; border-collapse: separate;">
                <tr>
                  <td style="border: 2px solid black; text-align: center; color: blue; font-size: 1.2em; font-weight: bold; padding: 20px; background-color: #d3d3d3; display: flex; justify-content: center; font-family: Tahoma, sans-serif;">
                    ${formData.ship_info.title}
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 2px solid black; padding: 20px;">
                    <ul>
                      ${
                        formData.ship_info.text
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
        ${templateContent}
    </div>   
    </body>
    </html>
  `

  return htmlContent
}
