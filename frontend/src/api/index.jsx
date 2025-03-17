class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  async checkResponse(res) {
    console.log(res);
    if (res.status === 204) {
      return res;
    }

    try {
      const data = await res.json();
      if (res.status < 400) {
        return data;
      } else {
        throw data;
      }
    } catch (error) {
      throw error;
    }
  }

  async signin({ email, password }) {
    try {
      const response = await fetch("/api/auth/token/login/", {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ email, password }),
      });
      return await this.checkResponse(response);
    } catch (error) {
      console.log("Ошибка при входе", error);
      throw error;
    }
  }

  async signup({ username, email, password }) {
    try {
      const response = await fetch("/api/users/", {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ username, email, password }),
      });
      return await this.checkResponse(response);
    } catch (error) {
      console.log("Ошибка при регистрации", error);
      throw error;
    }
  }

  async signout() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Токен отсутсвует");
    }
    try {
      const response = await fetch("/api/auth/token/logout/", {
        method: "POST",
        headers: {
          ...this._headers,
          authorization: `Token ${token}`,
        },
      });
      return this.checkResponse(response);
    } catch (error) {
      console.log("Ошибка при выходе:", error);
      throw error;
    }
  }
}

export default new Api("http://localhost:8000", {
  "content-type": "application/json",
});
