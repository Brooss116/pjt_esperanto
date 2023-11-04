import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { getAllTags } from "../components/apolloClient/Queries";
import { createNeed } from "../components/apolloClient/Mutations";
import { CURRENT_USER } from "../components//loggedUser/userLoged";
import { useLocation, useNavigate } from "react-router-dom";

export interface Tag {
  id: number;
  name: string;
}

export enum NeedType {
  Material = "Material",
  Professional = "Professional",
  Infrastructure = "Infrastructure",
}

export interface Need {
  title: string;
  type: string;
  infrastructure: string;
  description: string;
  tags: Tag[];
}

export default function Need() {
  let [message, setMessage] = useState<string>("");
  let [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [isSelectTagOpen, setIsSelectTagOpen] = useState(false);

  const [title, setTitlte] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<NeedType | string>(NeedType.Professional);
  const [infrastructure, setInfrastructure] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);

  const toggleFormVisibility = (): void => {
    setIsFormVisible(!isFormVisible);
  };

  const toggleSelectVisibility = (): void => {
    setIsSelectTagOpen(!isSelectTagOpen);
  };

  const handleTagSelection = (tag: Tag): void => {
    setIsSelectTagOpen(false);
    setTags([...tags, { id: tag.id, name: tag.name }]);
    setAllTags(allTags.filter((t) => t.id !== tag.id));
  };

  const submitForm = (): void => {
    const needData: Need = {
      title: title,
      type: type,
      infrastructure: infrastructure,
      description: description,
      tags: tags,
    };
    createNeed(CURRENT_USER, needData)
      .then((_data) => {
        navigate(0);
      }).then(() => {
        setMessage("Votre besoin a été créé avec succès");

      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllTags()
      .then((tagData) => {
        setAllTags(tagData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    location.hash.includes("add-need") ? toggleFormVisibility() : "";
  }, [location.hash]);
  isFormVisible
    ? document.querySelector("#add-need")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      })
    : "";

  return( 
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py- ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-1/4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 overflow-hidden bg-white shadow-lg sm:rounded-3xl sm:p-20 ">
            <div>
              <h1 className="text-2xl font-semibold">Exprimer un besoin </h1>
            </div>          
            {errorMessage && (
              <div className="text-red-400 text-sm mb-4">{errorMessage}</div>
            )}
            {!errorMessage && message && (
              <div className="text-primary-400 text-sm mb-4">{message}</div>
            )}
            <div
            className="flex flex-col gap-8 bg-white rounded-lg relative "
            id="add-need"
            >
            <div
              className="flex justify-between items-center w-full rounded-lg p-4"
              onClick={toggleFormVisibility}
            >
              {/* <h3 className="text-sm pb-1">Ajouter un besoin</h3> */}
              {/* <div className="flex justify-center items-center w-[35px] h-[35px] rounded-full cursor-pointer">
                <img
                  className="w-[30px] h-[30px]"
                  src={
                    isFormVisible ? "/src/assets/minus.png" : "/src/assets/plus.png"
                  }
                  alt="add"
                />
              </div> */}
            </div>
            
            <div className="flex flex-col gap-2 px-4 pb-4">
              <FormInput
                id="title"
                type="text"
                label="Titre"
                value={title}
                setValue={setTitlte}
              />
              {/* <div className="relative">
                <select
                  id="type"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="shadow-none peer placeholder-transparent h-10 w-full border-t-0 border-r-0 border-l-0 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 text-sm"
                >
                  <option value={NeedType.Professional}>
                    {NeedType.Professional}
                  </option>
                  <option value={NeedType.Material}>{NeedType.Material}</option>
                  <option value={NeedType.Infrastructure}>
                    {NeedType.Infrastructure}
                  </option>
                </select>
                <label
                  htmlFor="role"
                  className="absolute left-0 -top-3.5 text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 text-[12px] peer-focus:text-[12px] peer-placeholder-shown:text-sm"
                >
                  Rôle
                </label>
              </div> */}              
              <FormInput
                id="infrastructure"
                type="text"
                label="Infrastructure"
                value={infrastructure}
                setValue={setInfrastructure}
              />
              <FormInput
                id="description"
                type="textarea"
                label="Description"
                value={description}
                setValue={setDescription}
              />
              <div className="flex flex-col items-start justify-center mb-4">
                {tags.length >0 ? (<h3 className="text-sm text-gray-400">Tags</h3>):('')}  
                
                
                
                <div className="text-xxs flex flex-wrap mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-primary-100 rounded py-0.5 px-1 m-0.5"
                    >
                      {tag.name}
                    </span>
                  ))}
                  <a
                    href="#"
                    className="text-primary hover:font-semibold mt-[3px] py-0.5 px-1 m-0.5"
                    onClick={toggleSelectVisibility}
                  >
                    Ajouter un tag
                  </a>
                </div>
                {isSelectTagOpen && (
                  <div>
                    <select
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring text-[14px]"
                      value={""}
                      onChange={(e) => {
                        const selectedTagId = e.target.value;
                        const tag = allTags.find(
                          (tag) => tag.id == parseInt(selectedTagId)
                        );
                        if (tag) {
                          handleTagSelection(tag);
                        }
                      }}
                    >
                      <option value="">-- Sélectionnez un tag --</option>
                      {allTags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => submitForm()}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                >
                  Créer le besoin
                </button>
              </div>
            </div>
          
            </div>
          
        </div>
      </div>
    </div>

);
}