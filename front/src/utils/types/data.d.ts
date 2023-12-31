import { DocumentNode } from "graphql";
import Infrastructures from "../../pages/subpages/infrastructures";

export type globalUserProps = {
  description: string;
  email: string;
  experiences: string;
  firstname: string;
  healthActor: {
    careServiceType: string;
    id: string;
    supportServices: string;
    professional:{
      id: string,
      name: string
    };
  };
  healthNetwork: string;
  id: string;
  industrial: {
    id: string;
    careSector: string;
    otherSector: string;
  };
  lastname: string;
  phoneNumber: string;
  professionalStatus: string;
  profileBanner: string;
  profilePicture: string;
  researcher: {
    id: string;
    otherSector: string;
    researchArea: string;
    researchUnitName: string;
  };
  role: string;
  tags: Array<{ id: number; name: string }>;
};

export type needProps = {
  id: string;
    title: string;
    type: string;
    description: string;
    infrastructure: string;
    professionals:{
      id: string,
      name: string
    }[];
    materials:{
      id: string,
      name: string,
      ressourceLink: string,
      description: string,
    }[];
    // tags: Tag[];
    user: { 
      id: number
      profilePicture: string,
      firstname: string,
      lastname: string,
      email: string,
    };
  };

  export type materialProps  = {
    description: string,
    id: string,
    name: string,
    resourceImage: string, 
    resourceLink: string,
  }
