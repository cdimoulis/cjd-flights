class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  respond_to :json, :html

  ###
  # DON'T WANT TO USE THESE
  ###
  def new
    render :json => {  }, :status => 405
  end

  def edit
    render :json => {  }, :status => 405
  end

  ###
  # USEFUL CRUD OPS
  ###
  def create
    resource = params[:controller].singularize.classify.constantize
    record = resource.new(permitted_params)
    if record.valid? and record.save
      respond_with( record )
    else
      puts "\n\nCould not create #{resource} record.\n#{record.errors.inspect}\n\n"
      Rails.logger.debug "\n\nCould not create #{resource} record.\n#{record.errors.inspect}\n\n"
      render :json => {errors: record.errors}, :status => 422
    end
  end

  def index
    resource = params[:controller].singularize.classify.constantize
    records = resource.all

    respond_with( records )
  end

  def show
    resource = params[:controller].singularize.classify.constantize
    record = resource.where("id = ?", params[:id])
    if record.nil?
      render :json => {errors: "404"}, :status => 404
    else
      respond_with( record )
    end
  end

  def update
    resource = params[:controller].singularize.classify.constantize
    record = resource.where("id = ?", params[:id]).take
    if record.nil?
      render :json => {errors: "404"}, :status => 404
    else
      if record.update(permitted_params)
        respond_with( record )
      else
        render :json => { errors: record.errors }, :status => 404
      end
    end
  end

  def destroy
    resource = params[:controller].singularize.classify.constantize
    record = resource.where("id = ?", params[:id])
    if record.nil?
      render :json => {errors: "404"}, :status => 404
    else
      ( record.destroy ? two_hundred_response : four_hundred_response )
    end
  end
end
