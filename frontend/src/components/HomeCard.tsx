import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"


interface Props {
    apiRoute: string;
    query: string;
    authors: [];
    tags: [];
    date: [];  
}

const HomeCard = ({apiRoute, query, authors, tags, date}: Props) => {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle> </CardTitle>
        <CardDescription>An example search result</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="card-layout">
          <div className="card-text">
            <div className="search-text">
                <qry> Query input </qry> : {query}
            </div>
            <Separator className="my-4" />
            <div className="meta-text">
            <p> <qry> Authors </qry> : {authors} </p>
            </div>
            <div className="meta-text">
            <p> <qry> Tags </qry> : {tags} </p>
            </div>
            <div className="meta-text">
            <p> <qry> Date </qry> : {date} </p>
            </div>
          </div>
          <div className="card-image">
            <img src="https://github.com/SpaceMeerkat/sharkchasers/blob/main/static/cards/Blacktip%20Shark.jpg?raw=true" alt="Description" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeCard;


