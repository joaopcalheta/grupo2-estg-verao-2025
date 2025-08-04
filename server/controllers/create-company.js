const Company = require("../models/company");

const getCreateCompany = async (req, res) => {
  try {
    res.render("create-company", {});
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postCreateCompany = async (req, res) => {
  try {
    const { name, phone, nif, address, postcode, municipality, about_us, pic } =
      req.body;

    const user_id = req.user._id;

    console.log("Dados recebidos:", req.body);
    console.log("UserID:", user_id);

    const newCompany = new Company({
      name,
      phone,
      nif,
      address,
      postcode,
      municipality,
      about_us,
      pic,
      user_id,
    });

    await newCompany.save();
    res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoCreateCompany', 'true');
        window.location.href = '/settings?section=my-companies';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao criar empresa: ", err);
    res.status(500).send("Erro ao criar anúncio");
  }
};

module.exports = { getCreateCompany, postCreateCompany };
