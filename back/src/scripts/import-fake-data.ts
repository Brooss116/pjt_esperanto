import { createFakeUsersHealthActor, createFakeUsersIndustrial, createFakeUsersResearcher } from "@fixtures/user";
import { associations } from "@models/associations";
import { createFakeMaterials } from "@fixtures/material";
import {createFakeHealthCareEstablishment} from "@fixtures/healthCareEstablishment";

async function main() {
  console.log('Importing data...');
  associations();
  await createFakeUsersHealthActor(150);
  await createFakeUsersResearcher(150);
  await createFakeUsersIndustrial(150);
  await createFakeMaterials(10);
  await createFakeHealthCareEstablishment(50);
  console.log('✅  Importing done!');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
