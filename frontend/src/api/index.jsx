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
      throw { error, status: res.status };
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

  async createTask({ name, text }) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/tasks/", {
        method: "POST",
        headers: { ...this._headers, authorization: `Token ${token}` },
        body: JSON.stringify({ name, text }),
      });
      return this.checkResponse(response);
    } catch (error) {
      console.log("Ошибка при создании заметки:", error);
      throw error;
    }
  }

  async updateTask({ name, text, task_id }) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/tasks/${task_id}/`, {
        method: "PATCH",
        headers: { ...this._headers, authorization: `Token ${token}` },
        body: JSON.stringify({ name, text, id: task_id }),
      });
      return this.checkResponse(response);
    } catch (error) {
      console.log("Ошибка при редактировании заметки:", error);
      throw error;
    }
  }

  async deleteTask({ task_id }) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/tasks/${task_id}/`, {
        method: "DELETE",
        headers: { ...this._headers, authorization: `Token ${token}` },
      });
      return this.checkResponse(response);
    } catch (error) {
      console.log("Ошибка удаления заметки:", error);
      throw error;
    }
  }

  async getMyTasks() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/tasks/", {
        method: "GET",
        headers: { ...this._headers, authorization: `Token ${token}` },
      });
      return this.checkResponse(response);
    } catch (error) {
      console.log("Ошибка при получении заметок:", error);
      throw error;
    }
  }

  async getTask({ task_id }) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/tasks/${task_id}/`, {
        method: "GET",
        headers: { ...this._headers, authorization: `Token ${token}` },
      });
      return this.checkResponse(response);
    } catch (error) {
      console.log("Ошибка получения заметки:", error);
      throw error;
    }
  }

  async getFriends() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/users/me/", {
        method: "GET",
        headers: { ...this._headers, authorization: `Token ${token}` },
      });
      return this.checkResponse(response);
    } catch (error) {
      console.log("Ошибка получения друзей", error);
      throw error;
    }
  }

  async getCategories() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/categories/", {
        method: "GET",
        headers: { ...this._headers, authorization: `Token ${token}` },
      });
      return this.checkResponse(response);
    } catch (error) {
      console.log("Ошибка получения категорий", error);
      throw error;
    }
  }
}

export default new Api("http://localhost:8000", {
  "content-type": "application/json",
});
