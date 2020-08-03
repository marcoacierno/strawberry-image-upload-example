from typing import List
import strawberry
from strawberry.file_uploads import Upload

from avatars.models import Avatar as AvatarModel
from api.types import Avatar


@strawberry.type
class Query:
    @strawberry.field
    def avatars(self) -> List[Avatar]:
        return [Avatar(path=avatar.image.url) for avatar in AvatarModel.objects.all()]


@strawberry.type
class Mutation:
    @strawberry.mutation
    def upload_photo(self, image: Upload) -> Avatar:
        avatar = AvatarModel.objects.create(image=image)
        return Avatar(path=avatar.image.url)


schema = strawberry.Schema(query=Query, mutation=Mutation)
