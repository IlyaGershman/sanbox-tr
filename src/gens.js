export const generateRecursiveLinks = (n) =>
  new Array(n).fill(null).reduce((acc, c, i) => {
    let getKey = (i) => `${i}`;
    acc[getKey(i)] = {
      key: getKey(i),
      links: [
        { link: getKey(i - 1) },
        { link: getKey(i - 2) },
        { link: getKey(i - 3) },
        { link: getKey(i) },
        { link: getKey(i + 1) },
        { link: getKey(i + 2) },
        { link: getKey(i + 3) }
      ]
    };
    return acc;
  }, {});

export const generateNotRecursiveLinks = (n) =>
  new Array(n).fill(null).reduce((acc, c, i) => {
    let getKey = (i) => `${i}`;

    acc[getKey(i)] = {
      key: getKey(i),
      links: [
        { link: getKey(i + 1) },
        { link: getKey(i + 2) },
        { link: getKey(i + 3) },
        { link: getKey(i + 4) },
        { link: getKey(i + 5) },
        { link: getKey(i + 6) },
        { link: getKey(i + 7) }
      ]
    };
    return acc;
  }, {});

export function convertToUDTStructure(data) {
  return Object.values(data).reduce((acc, { key, links }) => {
    acc[`${"kookoobooboo_"}${key}`] = {
      fqn: `${"kookoobooboo_"}${key}`,
      name: `${"kookoobooboo_"}${key}`,
      displayName: `${"u"}${key}`,
      nodes: getNodes(links)
    };
    return acc;
  }, {});

  function getNodes(links) {
    return links.map(({ link }, index) => ({
      type: getType({ link, index })
    }));

    function getType({ link, index }) {
      const formatted = `${"kookoobooboo_"}${link}`;
      return index % 2 === 0
        ? { baseType: formatted }
        : {
            baseType: "List",
            typeArgument: formatted
          };
    }
  }
}

function strip(obj) {
  return Object.values(obj).reduce((acc, c, i) => {
    const { displayName, name, fqn, nodes } = c;
    acc[c.fqn] = {
      displayName,
      name,
      fqn,
      nodes: nodes.map((n) => {
        const { name, displayName, type } = n;
        return {
          name,
          displayName,
          type
        };
      })
    };
    return acc;
  }, {});
}

export const data1 = {
  a: { key: "a", links: [{ link: "b" }, { link: "c" }, { link: "d" }] },
  b: { key: "b", links: [{ link: "q" }, { link: "d" }, { link: "e" }] },
  c: { key: "c", links: [{ link: "a" }, { link: "b" }, { link: "c" }] },
  d: { key: "d", links: [{ link: "e" }, { link: "e" }, { link: "e" }] },
  e: { key: "e", links: [{ link: "a" }, { link: "b" }, { link: "c" }] },
  j: { key: "j", links: [{ link: "a" }, { link: "b" }, { link: "c" }] }
};

export const data2 = {
  a: { key: "a", links: [{ link: "b" }, { link: "c" }] },
  b: { key: "b", links: [{ link: "c" }] },
  c: { key: "c", links: [{ link: "a" }, { link: "b" }, { link: "c" }] }
};

export const data3 = {
  a: { key: "a", links: [{ link: "a" }, { link: "b" }, { link: "c" }] },
  b: { key: "b", links: [{ link: "r" }] },
  c: { key: "c", links: [{ link: "r" }, { link: "a" }, { link: "c" }] }
};

export const data4 = {
  a: { key: "a", links: [{ link: "b" }] },
  b: { key: "b", links: [{ link: "b" }, { link: "a" }] }
};

export const data5 = {
  a: { key: "a", links: [{ link: "b" }] },
  b: { key: "b", links: [{ link: "c" }, { link: "d" }] },
  c: { key: "c", links: [{}, {}] },
  d: { key: "d", links: [{}, {}] },
  e: { key: "e", links: [{}] },
  f: { key: "f", links: [{ link: "g" }] },
  g: { key: "g", links: [{}] },
  h: { key: "h", links: [{}] }
};

export const udts1 = {
  "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_583dd11c_5c51_4cbc_bc2f_0d349be4de7b": {
    displayName: "u1",
    name: "UserDefinedType_583dd11c_5c51_4cbc_bc2f_0d349be4de7b",
    fqn:
      "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_583dd11c_5c51_4cbc_bc2f_0d349be4de7b",
    nodes: [
      {
        name: "UserDefinedType__8e4f4a33_19f0_4317_a04a_7aa27203f487",
        displayName: "u1u2",
        type: {
          baseType:
            "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_b650474e_c07a_431c_9463_6c82150201e8"
        }
      }
    ]
  },
  "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_b650474e_c07a_431c_9463_6c82150201e8": {
    displayName: "u2",
    name: "UserDefinedType_b650474e_c07a_431c_9463_6c82150201e8",
    fqn:
      "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_b650474e_c07a_431c_9463_6c82150201e8",
    nodes: [
      {
        name: "UserDefinedType__1e02ed75_62e9_422b_9575_92aa98a6b1d3",
        displayName: "u2u3",
        type: {
          baseType:
            "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_7d183d98_d083_430f_92b9_88cff22e824e"
        }
      },
      {
        name: "UserDefinedType__ca77e434_365b_4b0a_b2e8_72f58e20bed1",
        displayName: "text",
        type: {
          baseType: "Direct.Shared.Timer"
        }
      },
      {
        name: "UserDefinedType__ac3355d1_ec21_469d_a1ab_09719a750b77",
        displayName: "u2u3L",
        type: {
          baseType:
            "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_fba0600b_1083_462e_9b8f_de613673e28a"
        }
      }
    ]
  },
  "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_7d183d98_d083_430f_92b9_88cff22e824e": {
    displayName: "u3",
    name: "UserDefinedType_7d183d98_d083_430f_92b9_88cff22e824e",
    fqn:
      "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_7d183d98_d083_430f_92b9_88cff22e824e",
    nodes: [
      {
        name: "UserDefinedType__d7a90bd7_7eff_4485_a7d8_bf1f734c2f96",
        displayName: "u3u4",
        type: {
          baseType:
            "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_fba0600b_1083_462e_9b8f_de613673e28a"
        }
      }
    ]
  },
  "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_fba0600b_1083_462e_9b8f_de613673e28a": {
    displayName: "u4",
    name: "UserDefinedType_fba0600b_1083_462e_9b8f_de613673e28a",
    fqn:
      "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_fba0600b_1083_462e_9b8f_de613673e28a",
    nodes: [
      {
        name: "UserDefinedType__46bafc93_72dd_4137_b7d2_69803b3df944",
        displayName: "u4u5",
        type: {
          baseType:
            "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_4df9e942_7a6e_4afa_a52b_b66554c121da"
        }
      },
      {
        name: "UserDefinedType__399188ad_b922_4dc8_a170_2f1d1eacb27b",
        displayName: "t",
        type: {
          baseType: "Text"
        }
      }
    ]
  },
  "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_4df9e942_7a6e_4afa_a52b_b66554c121da": {
    displayName: "u5",
    name: "UserDefinedType_4df9e942_7a6e_4afa_a52b_b66554c121da",
    fqn:
      "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_4df9e942_7a6e_4afa_a52b_b66554c121da",
    nodes: [
      {
        name: "UserDefinedType__bffdfc0f_3a2e_4828_8e74_2221d848ce45",
        displayName: "u5u6P",
        type: {
          baseType:
            "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_90e290f5_c24b_4744_bfba_d2d0a491cfb4"
        }
      },
      {
        name: "UserDefinedType__ecba10ef_791e_4af4_bb7d_63c58d227c80",
        displayName: "cHttp",
        type: {
          baseType: "Direct.Common.Library.HttpRequest"
        }
      }
    ]
  },
  "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_90e290f5_c24b_4744_bfba_d2d0a491cfb4": {
    displayName: "u6",
    name: "UserDefinedType_90e290f5_c24b_4744_bfba_d2d0a491cfb4",
    fqn:
      "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_90e290f5_c24b_4744_bfba_d2d0a491cfb4",
    nodes: [
      {
        name: "UserDefinedType__c10a4ec6_77e4_4921_bcd9_42f626b17d80",
        displayName: "6",
        type: {
          baseType: "DateTime"
        }
      },
      {
        name: "UserDefinedType__b574c501_0b04_48e3_bf80_75e9fad834f3",
        displayName: "wakawaka",
        type: {
          baseType: "Direct.Shared.RTException"
        }
      },
      {
        name: "UserDefinedType__5b911574_a42f_44b7_bde6_421c802ef383",
        displayName: "boom",
        type: {
          baseType: "List",
          typeArgument: "DateTime"
        }
      },
      {
        name: "UserDefinedType__20644b2b_97dc_49a5_aa99_8b0742baa919",
        displayName: "r",
        type: {
          baseType: "Direct.TextAnalytics.Library.Microsoft.MSEntityResponse"
        }
      }
    ]
  },
  "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_f780d28b_1666_4503_bb2f_d915288d8759": {
    displayName: "c",
    name: "UserDefinedType_f780d28b_1666_4503_bb2f_d915288d8759",
    fqn:
      "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_f780d28b_1666_4503_bb2f_d915288d8759",
    nodes: [
      {
        name: "UserDefinedType__d6d2942f_33f1_436d_a346_0637d65cf3ee",
        displayName: "d",
        type: {
          baseType:
            "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_583dd11c_5c51_4cbc_bc2f_0d349be4de7b"
        }
      },
      {
        name: "UserDefinedType__42326639_7e4c_4bf8_89d2_a41a1becefb4",
        displayName: "text",
        type: {
          baseType:
            "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_7d183d98_d083_430f_92b9_88cff22e824e"
        }
      }
    ]
  },
  "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_710dd8d6_6745_47d2_bc55_4ab8b808c425": {
    displayName: "usimploe",
    name: "UserDefinedType_710dd8d6_6745_47d2_bc55_4ab8b808c425",
    fqn:
      "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_710dd8d6_6745_47d2_bc55_4ab8b808c425",
    nodes: [
      {
        name: "UserDefinedType__e1d5bf63_d5c9_46b4_b4fa_87594b07bdae",
        displayName: "t",
        type: {
          baseType: "Text"
        }
      },
      {
        name: "UserDefinedType__cfb51d19_7297_4882_a3c8_f01f26383f40",
        displayName: "b",
        type: {
          baseType: "Boolean"
        }
      },
      {
        name: "UserDefinedType__5de87bb4_3a5f_44df_acee_0c88187635ba",
        displayName: "d",
        type: {
          baseType: "DateTime"
        }
      }
    ]
  },
  "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_0ee7bd59_761c_4ec2_8415_57beb4a2b2cc": {
    displayName: "qweqwe",
    name: "UserDefinedType_0ee7bd59_761c_4ec2_8415_57beb4a2b2cc",
    fqn:
      "dproj_XnIg2lP7iPCbGzKfddvw.UserDefinedType_0ee7bd59_761c_4ec2_8415_57beb4a2b2cc",
    nodes: [
      {
        name: "UserDefinedType__a7d09823_39e4_4073_8d78_031bbe27683e",
        displayName: "qweqweqweqwe",
        type: {
          baseType: "Text"
        }
      }
    ]
  }
};

export const linkedObjects = [data1, data2, data3, data4, data5];
