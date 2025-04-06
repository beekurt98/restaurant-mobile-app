import { useContext } from "react";
import { SupabaseContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function PasswordMgmt() {
  const { supabase, authUser, userId } = useContext(SupabaseContext);
  const navigate = useNavigate();

  async function handlePasswordChange(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { password, password2 } = formObj;
    if (password != password2) return;
    const { data, error } = await supabase.auth.updateUser({
      password
    })
    navigate("/");
  }


  return (
    <>
      <div className="page-container-with-navbar">
        <div className="password-management-header">
          <h2>Yeni Şifre Oluştur</h2>
          <a href="/Settings">Ayarlar</a>
        </div>
        <form onSubmit={handlePasswordChange}>
          <div className="password-form-area">
            <input type="password" name="password" placeholder="Yeni Şifre" />
            <input type="password" name="password2" placeholder="Yeni Şifreyi Tekrarlayınız" />
            <button>Şifreyi Değiştir</button>
          </div>
        </form>
      </div>
    </>
  )
}