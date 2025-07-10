import {readFileSync} from 'node:fs';
import * as assert from 'node:assert';

import {compileSol} from './helpers.js';

import {mergeVerifiers} from '../index.js';

describe('mergeVerifiers', () => {

  it('should support proofs for either circuit (2 public outputs)', async () => {
    const mergedSol = mergeVerifiers([
      readFileSync('./test/contracts/MultiTest5.sol', 'utf8'),
      readFileSync('./test/contracts/MultiTest6.sol', 'utf8'),
    ], 5);

    const contract = await compileSol(mergedSol);

    // Generated at:
    // https://circuitscan.org/chain/17000/address/0xba2a1e7dc9dfb8dbef1f529d575bb0500b7082bd
    assert.ok(await contract.verifyProof(
      [
        "0x1e31d7509147e19aac7cefe6c5bd22c6ddac49da72921e769eb461c629604147",
        "0x0701ad07c3869b4a6908df1688ecdf6d4bff472c3ab70d03fe24d299e0657910"
      ],
      [
        [
          "0x0a745e8828c061cb4c5631c206d7d07b32a450e358b8d44be0907f46ca1bab54",
          "0x2e380eead89c9e4906f86f3aee3843e681264e8edbc28e4da693029945c553e6"
        ],
        [
          "0x11fff0d907abefbe42f37c7370f3008478f7358440032a0427ae3a0cadbad55b",
          "0x2c8179aacd047bba26debbffaf20726437e0beaca2b9e06f710fe471fc686046"
        ]
      ],
      [
        "0x1ba843b31c41a23d1b0e7c23cbb0679eb3aad5851089e2c9a716ec3878d03dfe",
        "0x2c1c478132b4fdf596f07bc2459148be2d09b0b729dc0bdaa1ea0c0a5bde1255"
      ],
      [
        "0x000000000000000000000000000000000000000000000000000000000000000f"
      ],
      5 // verifier index
    ));

    // Generated at:
    // https://circuitscan.org/chain/17000/address/0x08e673f966cb25275db8cf02ff9966d66005709f
    assert.ok(await contract.verifyProof(
      [
        "0x1073b9c4db85ab971855d509fd5c998927e7cf3c5338c3c527f0ea07c873e3b4",
        "0x181c5f060cad1c1c5ccadfb5c400bf79cdf867c28dbc810f8b2976486f5fcf07"
      ],
      [
        [
          "0x2de22e9bb377aa6b41d50e0f7a9fa8cba722023d00b6a2326f50999950b2f6b5",
          "0x22f3765899ad803531e10a87b347fbf875596ca5875499b79be135b1afffbe88"
        ],
        [
          "0x06770ad8998028b9a58b58155f2957db428f3178a9d6f678d4c5c8be21248980",
          "0x1e573607af10cb4f81a6b67137b1439c617135eeecb2c5f58c95078994e4e5c3"
        ]
      ],
      [
        "0x283d1e19ff93935a57c4cc705c7212466a823cbb9dcf4cfed3ce9fe9f24c8590",
        "0x0466b1a38d846a2014a5b1849e6e025a42ea6409ba6f9b44ff4399c169b93160"
      ],
      [
        "0x000000000000000000000000000000000000000000000000000000000000001e"
      ],
      6 // verifier index
    ));

  });

  it('should support proofs for either circuit (4 public outputs)', async () => {
    const mergedSol = mergeVerifiers([
      readFileSync('./test/contracts/semaphorev4-1.sol', 'utf8'),
      readFileSync('./test/contracts/semaphorev4-2.sol', 'utf8'),
    ], 1);

    const contract = await compileSol(mergedSol);
    // Generated at:
    // https://circuitscan.org/chain/17000/address/0xf24a641276ca49e9984124ddf52df4b0d40e63a3
    assert.ok(await contract.verifyProof(
      [
        "0x062aeddad7b622f3847e45009486fa463161a7ff829cbb977d0e06293c5f461d",
        "0x1bddc3a7b37d404ee8610494329e27b77e9bd3788e6e12fdcdc7545c0752b70a"
      ],
      [
        [
          "0x11e0228b4758b4448e61ea63d307397ec8eee7103eb31f2f7d040e01890b7bf8",
          "0x2a435d8ac9a0a314d1bd1861cee5b3326832866b6d989805407d9bae006fa964"
        ],
        [
          "0x18178d5b1129c0439ff46a0c0fc597b74979326fc5a5f50993e9e4ec79de9382",
          "0x1c90c76e91daf5cf1bc15ba32965a76ac91e238a59f909294aa10320af2d286d"
        ]
      ],
      [
        "0x1f2f34279eaef942bfd961be8818ec9a5505c4fda7f0baa4f0259474acc04940",
        "0x01ac64e59a6284962175bbe3c0808f5a81a7bd7a011d3d24302145c4eff663ec"
      ],
      [
        "0x2b06105f6d967bf70900c2ad8e0b2b288ce1b01bc8c5754efdf898b1576c6664",
        "0x007af346e2d304279e79e0a9f3023f771294a78acb70e73f90afe27cad401e81",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      ],
      1 // verifier index
    ));

    // Generated at:
    // https://circuitscan.org/chain/17000/address/0x467d5a506f0dcfbffaa403656ed1cc1477d657eb
    assert.ok(await contract.verifyProof(
      [
        "0x1f5532801ce6e8c8dc1ff6625094aaae65c4e91ac9cc8cb474faec0e5f6fe407",
        "0x228dd2ceda5dd8e9bc5db8467bed35ee6dde9e054184e93fe9301fab8cbfe5e8"
      ],
      [
        [
          "0x175e7dc532a812e7ac36d0dd2e41645265c793489c563af971d60069b4ca8408",
          "0x2dd410ae6cbd05f93d61bd34590d35283da8505024e1efc5088617105c96a449"
        ],
        [
          "0x030d4f69027dae1a5e2a9bb77b31b5882ca5878dd42410e76d067631d0a3a6ff",
          "0x26db88d9150d513f7cbfabb5af311ba5a224fae28735322752c27fdd1d80a7ec"
        ]
      ],
      [
        "0x08c0d87c2a7c2c45dafc540fed873685898fbb09f750f1d3f359c706cde1c09a",
        "0x1f7a4134f0ef0b4889b5f59448cdd018dc08e4860885ff7c352bd28def428d53"
      ],
      [
        "0x2b06105f6d967bf70900c2ad8e0b2b288ce1b01bc8c5754efdf898b1576c6664",
        "0x007af346e2d304279e79e0a9f3023f771294a78acb70e73f90afe27cad401e81",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      ],
      2 // verifier index
    ));
  });

});
