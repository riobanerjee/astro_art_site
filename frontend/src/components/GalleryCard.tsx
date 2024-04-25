import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface Props {
    apiRoute: string;
}

const HomeCard = ({apiRoute}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle> </CardTitle>
        <CardDescription>An example search result</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="card-layout">
          <div className="card-text">
          </div>
          <div className="card-image-sub">
            <img src="https://github.com/SpaceMeerkat/sharkchasers/blob/main/static/cards/Blacktip%20Shark.jpg?raw=true" alt="Description" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
