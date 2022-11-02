interface ICatsBreeds {
    name: string,
    description: string
}

export interface ICats {
    id: string,
    url: string
    breeds: ICatsBreeds[]
}

class CatsService {
    randomCats(limit: number = 1): Promise<ICats[]> {
        return new Promise((resolve, reject) => {
            fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`, {
                method: 'GET',
                headers: {
                    "x-api-key": "live_EdN7SP7V8TIv03y0g0YNgH1O9IpYOYeU8lgmD4rRafBgGzf0YcrUNlR8GdEygdWp"
                }
            }).then(res => {
                if (!res.ok) {
                    reject();
                    return;
                }

                res.json().then(json => resolve(json));
            }, (err) => {
                console.error('error to fetch random cats: ', err);
            })
        });
    }
}

export default CatsService;