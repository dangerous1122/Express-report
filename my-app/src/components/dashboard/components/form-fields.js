

const formSections = [

    {
      title: "Sender Details",
      fields: [
        {
          label: "Full name",
          name: "full-name",
          id: "full-name",
          type: "text",
          autoComplete: "given-name",

        },

        {
          label: "Company",
          name: "company",
          id: "company",
          type: "text",
          autoComplete: "organization",
        },
        {
          label: "Email",
          name: "email",
          id: "email",
          type: "email",
          autoComplete: "email",
        },
        {
          label: "Phone number",
          name: "phone-number",
          id: "phone-number",
          type: "tel",
          autoComplete: "tel",
          isFullWidth: true, 
        },
      ],
    },
    {
      title: "Receiver Details",
      fields: [
        {
            label: "Full name",
            name: "full-name",
            id: "full-name",
            type: "text",
            autoComplete: "given-name",
          },
 
        {
          label: "Company",
          name: "company",
          id: "company",
          type: "text",
          autoComplete: "organization",
        },
        {
          label: "Email",
          name: "email",
          id: "email",
          type: "email",
          autoComplete: "email",
        },
        {
          label: "Phone number",
          name: "phone-number",
          id: "phone-number",
          type: "tel",
          autoComplete: "tel",
          isFullWidth: true, 
        },
      ],
    },
  ];

  export default formSections