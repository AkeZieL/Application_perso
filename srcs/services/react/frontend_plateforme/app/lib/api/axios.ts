import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials: true,
});

const refreshApi = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config;

        if(!request) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !request._retry) {
            request._retry = true;
            console.log('request', request);

            try {
                console.log('CALL REFRESH');
                await refreshApi.post("/auth/token/refresh/");
                console.log('token refreshed');
                return api(request);
            } catch {
                console.log('token refresh failed');
                return Promise.reject(error);
            }
        }
        console.log('Error != 401', error.response);
        return Promise.reject(error);
    }
);

export default api
/*


let refreshPromise: Promise<any> | null = null;
let failedQueue: Array<(error?: any) => void> = [];
let isRefreshingLock = false;

const log = (...args: any[]) => {
    console.log("[API]", ...args);
};


const processQueue = (error: any = null) => {
    log("📦 PROCESS QUEUE | size =", failedQueue.length);

    const queue = [...failedQueue];
    failedQueue = [];

    queue.forEach((cb) => {
        try {
            cb(error);
        } catch (e) {
            console.log("queue error:", e);
        }
    });

    log("📦 PROCESS QUEUE DONE");
};


const getRefreshToken = () => {
    if (refreshPromise) {
        log("♻️ REUSING REFRESH PROMISE");
        return refreshPromise;
    }

    log("🚀 START REFRESH REQUEST");

    isRefreshingLock = true;

    refreshPromise = refreshApi
        .post("auth/token/refresh/")
        .then((res) => {
            log("✅ REFRESH SUCCESS");
            return res.data;
        })
        .catch((err) => {
            log("❌ REFRESH FAILED");
            throw err;
        })
        .finally(() => {
            log("🧹 RESET REFRESH STATE");
            refreshPromise = null;
            isRefreshingLock = false;
        });

    return refreshPromise;
};


api.interceptors.response.use(
    (response) => {
        log("⬅️ OK:", response.config.url);
        return response;
    },

    async (error) => {
        const request = error.config;

        if (!request) return Promise.reject(error);

        if (request._retry) {
            log("🚫 ALREADY RETRIED:", request.url);
            return Promise.reject(error);
        }

        const status = error.response?.status;

        if (status !== 401) {
            return Promise.reject(error);
        }

        request._retry = true;

        log("⚠️ 401:", request.url);


        if (refreshPromise || isRefreshingLock) {
            log("⏳ QUEUED:", request.url);

            return new Promise((resolve, reject) => {
                failedQueue.push((err) => {
                    if (err) return reject(err);

                    log("🔁 RETRY QUEUED:", request.url);

                    setTimeout(() => {
                        resolve(
                            api({
                                ...request,
                                _retry: true,
                            })
                        );
                    }, 50); // IMPORTANT: allow cookie propagation
                });
            });
        }


        try {
            await getRefreshToken();

            log("🔁 PROCESS QUEUE AFTER REFRESH");
            processQueue();

            log("🔁 RETRY ORIGINAL:", request.url);

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        api({
                            ...request,
                            _retry: true,
                        })
                    );
                }, 50);
            });
            
        } catch (err) {
            log("💥 REFRESH FAILED → CLEAR QUEUE");
            processQueue(err);
            return Promise.reject(err);
        }
    }
);
*/