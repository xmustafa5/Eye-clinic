import { Card,Form,Button} from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return(
        <>
        
        <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Reset password</h2>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="email" id="email" />
                </Form.Group>
              
             
                <Button variant="primary" type="submit">
                Reset password
      </Button>
            </Form>
            <div className="w-100 text-center mt-3">
            <Link to="/login">login</Link>
            </div>
        </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
        need an account <Link to="/singup">signup</Link>
        </div>
        </>
    )
}

export default ForgotPassword;