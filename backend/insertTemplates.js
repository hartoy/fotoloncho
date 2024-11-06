const sequelize = require('./models/index')
const Template = require('./models/Template')

async function insertTemplates() {
  try {
    await sequelize.sync()

    const templates = [
      {
        template_type: 'ads',
        first_title: 'See the other ADS I have:',
        first_title_url: 'https://www.ebay.com/str/fotoloncho/ADS-ADVERTISINGS/_i.html?store_cat=799684013',
        red_title: null,
        first_block: {
          text: [
            'I do my best to honestly describe all items I offer on ebay.',
            'Any defects not mentioned but visible in the pictures will be considered as described.',
            'Remember that anything that is vintage or used will show signs of normal wear !!',
            "If you need some additional information, do not hesitate to contact me through Ebay mail or at the bottom of this page by clicking in 'Ask a question'.",
            'If you buy multiple items ask for a combined invoice to save shipping costs.',
            'No rights given or implied, just from one collector to other.',
          ],
        },
        payment_block: {
          title: 'PAYMENTS METHOD ACCEPTED:',
          text: [
            'I certainly prefer payments through Paypal. You can also use your major credit cards through PayPal.',
            'Payment is appreciated within 10 days. Please contact me to set up extended payment terms.',
            "Import duties, taxes and charges are not included in the item price or shipping charges. These charges are the buyer's responsibility.",
          ],
        },
        ship_info: {
          title: 'HOW ITEMS WILL BE SHIPPED:',
          text: [
            'I will ship the ADS you buy, in a protective sleeve between 2 plastic cardboards (Acid-Free), in a secure envelope so that you get your item in the same conditions as I sent it.',
          ],
        },
        ship_time: {
          title: 'TIME OF SHIPPING:',
          text: [
            'Please be Patient: I ship twice a week, every Monday & Friday.',
            'Domestic Handling time: 3 working days',
            'For customers abroad I ship only by Federal Express (FEDEX), it usually takes 5 - 10 business days according to destination.',
          ],
        },
        ship_time: {
          title: 'CONDITION:',
          text: [
            'The item you are about to buy or bid is an advertisement, therefore what you will be receiving is a piece of paper and not the product or service offered in it !!',
            'This is an original AD, carefully removed from a vintage magazine or newspaper.',
            'It is Original, not a reproduction or a current copy; is real vintage from the originaltime period, otherwise, it will be explained at the beginning of the description.',
            'The pages may have minor tears in the edges, especially at or near the staple holes on the bound edge. The pages may also have minor folds and a natural yellow tint around the edges and corners due to aging.',
          ],
        },
      },
    ]

    await Template.bulkCreate(templates)
    console.log('Templates inserted successfully!')

    await sequelize.close()
  } catch (error) {
    console.error('Error inserting templates:', error)
  }
}

insertTemplates()
