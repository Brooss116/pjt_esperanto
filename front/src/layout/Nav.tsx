import { Link, NavLink, useNavigate } from "react-router-dom";
import profil from "../assets/profile.svg";
import { useState,useEffect, useRef} from "react";
import Logo from "../components/Logo";
import { globalUserProps } from "../utils/types";
import { CURRENT_USER } from "../components/loggedUser/userLoged";
import { getUserById } from "../components/apolloClient/Queries";



// import FormInput from "../components/FormInput";

export default function Nav() {
  const [user, setUser] = useState<globalUserProps>();

  const navigate = useNavigate();
  const [openA, setOpenA] = useState(false);
  const [openN, setOpenN] = useState(false);
  const [openProfil, setOpenProfil] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  function isAuthenticated() {
    const userId = localStorage.getItem("userId"); // Récupérez l'ID de l'utilisateur à partir du local storage
    const userEmail = localStorage.getItem("userEmail"); // Récupérez l'e-mail de l'utilisateur à partir du local storage

    // Vérifiez si l'utilisateur est connecté en fonction des valeurs récupérées du local storage
    return userId && userEmail;
  }

  function removeSession() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFirstname");
    navigate("/login");
    window.location.reload();
  }

  




  function handleClickOutside(event: MouseEvent) {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      // Check if the clicked element is the profile icon
      if (event.target !== profileRef.current.firstChild?.nextSibling ) {
        setOpenProfil(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getUserById(CURRENT_USER)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
    
  






  // const submit = useSubmit();
  return (
    <div onClick={()=>setOpenProfil(true)}className="flex flex-col top-0 left-0 z-10 fixed w-full ">
      
        {isAuthenticated() ? ("") : (
          <div className="flex justify-end items-center bg-gray-200 h-8">
            <div className="flex gap-2 text-[14px] pr-8">
              <div className="cursor-pointer">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "bg-primary text-white p-2" : "p-2"
                  }
                >
                  Se connecter
                </NavLink>
              </div>
              <span>|</span>
              <div className="cursor-pointer">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "bg-primary text-white p-2" : "h-full w-full p-2"
                  }
                >
                  S'enregistrer
                </NavLink>
              </div>
            </div>
          </div>
        )}
      
      <nav className="px-4 top-0 left-0 bg-white">
        <ul>
          <li>
            <NavLink to="/accueil">
              <Logo />
            </NavLink>
          </li>
        </ul>

        <nav className=" flex items-center gap-4">

          <div onMouseLeave={() => setOpenN(false)} className="relative">
            <div onMouseOver={() => setOpenN(true)} className="">
              <NavLink
                to="/besoin"
                className={(() => {
                  const currentPath = window.location.pathname;

                  switch (currentPath) {
                    case "/besoin":
                      return "flex items-center bg-primary text-white";
                    case "/exprimer-besoin":
                      return "flex items-center bg-primary text-white";
                    case "/repondre-besoin":
                      return "flex items-center bg-primary text-white";
                    default:
                      return "flex items-center hover:bg-primary-hover";
                  }
                })()}
              >
                Besoins
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </NavLink>
            </div>
            <ul
              className={`absolute right-0 w-40 py-2 mt-2 rounded-lg shadow-xl bg-white ${
                openN ? "block" : "hidden"
              }`}
            >
              <li className="mx-1 w-full">
                <NavLink
                  to="/besoin"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover"
                  }
                >
                  Mes besoins
                </NavLink>
              </li>

              <li className="mx-1 w-full">
                <NavLink
                  to="/besoin"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover "
                  }
                >
                  Exprimer un besoin
                </NavLink>
              </li>

              <li className="mx-1 w-full">
                <NavLink
                  to="/besoin"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover"
                  }
                >
                  Répondre à des besoins
                </NavLink>
              </li>
            </ul>
          </div>

          <div onMouseLeave={() => setOpenA(false)} className="relative">
            <div onMouseOver={() => setOpenA(true)} className="">
              <NavLink
                to="professionnels/sante"
                className={(() => {
                  const currentPath = window.location.pathname;

                  switch (currentPath) {
                    case "/professionnels/sante":
                      return "flex items-center bg-primary text-white";
                    case "/professionnels/industriel":
                      return "flex items-center bg-primary text-white";
                    case "/professionnels/chercheur":
                      return "flex items-center bg-primary text-white";
                    default:
                      return "flex items-center hover:bg-primary-hover";
                  }
                })()}
              >
                Annuaire
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </NavLink>
            </div>
            <ul
              className={`absolute right-0 w-40 py-2 mt-2 rounded-lg shadow-xl bg-white ${
                openA ? "block" : "hidden"
              }`}
            >
              <li className="mx-1 w-full">
                <NavLink
                  to="/professionnels/sante"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover"
                  }
                >
                  Santé
                </NavLink>
              </li>

              <li className="mx-1 w-full">
                <NavLink
                  to="/professionnels/industriel"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover "
                  }
                >
                  Industriel
                </NavLink>
              </li>

              <li className="mx-1 w-full">
                <NavLink
                  to="/professionnels/chercheur"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover"
                  }
                >
                  Chercheur
                </NavLink>
              </li>
            </ul>
          </div>

          <div  className="relative">
            {openProfil ? (<div ref={profileRef}  className="">
                  <div className="p-3 hover:bg-primary-hover">
                    <img src ={profil} alt="" className="w-4" />
                  </div>
              </div>)
              :
              (<div   onClick={() => setOpenProfil(true)}  className="">
                  <div className="p-3 cursor-pointer hover:bg-primary-hover">
                    <img src ={profil} alt="" className="w-4" />
                  </div>
              </div>)
            }
            
            <div  >
              <div 
                  className={`absolute right-0 w-96 py-2 mt-2 rounded-xl shadow-xl bg-gray-200 border-2 ${
                    openProfil ? "block" : "hidden"
                  }`
                  }
              >
                  
                <div className="p-4 flex justify-between">                  
                  <div className="text-xs font-semibold">
                    {localStorage.getItem("userEmail")}
                  </div>                             
                </div>
                <div className="p-4 flex justify-">                  
                  <div className="text-xs font-semibold">
                    {localStorage.getItem("userEmail")}
                  </div>                             
                </div>
                <div className="pt-8 flex justify-center "> 
                  <img
                    src={user?.profilePicture ?? "/public/test.png"}
                    alt=""
                    className="rounded-full w-24 h-24 border-2 border-solid border-black -mt-10"
                  />   
                </div>
              
                  
                <div className="flex justify-center">
                  <div className="text-lg font-semibold">
                    Bonjour, {localStorage.getItem("userFirstname")} !
                  </div>
                </div>

                <div className=" flex justify-center bottom-0">
                  <div className=" cursor-pointer w-1/2 hover:bg-primary-hover text-center rounded-lg" onClick={() => removeSession()}>
                    Se deconnecter
                  </div>
                </div>
                

              </div>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
}
